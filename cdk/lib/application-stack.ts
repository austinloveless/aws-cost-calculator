import {
  Stack,
  Construct,
  CfnOutput,
  StackProps,
  RemovalPolicy,
} from "@aws-cdk/core";
import { LambdaRestApi } from "@aws-cdk/aws-apigateway";
import {
  Function,
  Runtime,
  Code,
  IFunction,
  CfnParametersCode,
} from "@aws-cdk/aws-lambda";
import {
  ManagedPolicy,
  PolicyDocument,
  PolicyStatement,
  Role,
  ServicePrincipal,
} from "@aws-cdk/aws-iam";
import { Dashboard } from "@aws-cdk/aws-cloudwatch";
import { GraphWidget, Metric } from "@aws-cdk/aws-cloudwatch";
import { Table, BillingMode, AttributeType } from "@aws-cdk/aws-dynamodb";

interface ApplicationStackProps extends StackProps {
  applicationName: string;
  stage: string;
}

export class ApplicationStack extends Stack {
  public readonly lambdaCode: CfnParametersCode;
  readonly handler: IFunction;

  constructor(scope: Construct, id: string, props: ApplicationStackProps) {
    super(scope, id, props);

    const table = new Table(this, id, {
      billingMode: BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.DESTROY,
      partitionKey: { name: "ipAddress", type: AttributeType.STRING },
    });

    this.lambdaCode = Code.fromCfnParameters();

    const dynamoDBFullAccess = new PolicyDocument({
      statements: [
        new PolicyStatement({
          resources: [table.tableArn],
          actions: ["dynamodb:*"],
        }),
      ],
    });

    const lambdaRole = new Role(this, "lambda-role", {
      assumedBy: new ServicePrincipal("lambda.amazonaws.com"),
      roleName: "ApplicationStackLambdaRole",
      inlinePolicies: {
        DynamoDBFullAccess: dynamoDBFullAccess,
      },
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName("AWSPriceListServiceFullAccess"),
      ],
    });

    const handler = new Function(
      this,
      `${props.applicationName}-${props.stage}`,
      {
        runtime: Runtime.NODEJS_14_X,
        code: this.lambdaCode,
        handler: "dist/lambda.handler",
        functionName: `${props.applicationName}-${props.stage}`,
        role: lambdaRole,
        environment: {
          PRODUCT_ID: process.env.PRODUCT_ID ?? "",
          STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY ?? "",
          NODE_ENV: "production",
          TABLE_NAME: table.tableName,
        },
      }
    );

    const api = new LambdaRestApi(
      this,
      `${props.applicationName}-api-${props.stage}`,
      {
        handler,
        proxy: false,
        restApiName: `${props.applicationName}-api-${props.stage}`,
      }
    );

    // root
    api.root.addMethod("GET");

    // graphql
    const graphql = api.root.addResource("graphql");
    graphql.addMethod("ANY");

    // api
    const apiRoot = api.root.addResource("api");

    // lambda
    const lambda = apiRoot.addResource("lambda");
    const lambdaUsageType = lambda.addResource("{usageType}");
    lambdaUsageType.addMethod("GET");

    // ec2
    const ec2 = apiRoot.addResource("ec2");
    const ec2InstanceType = ec2.addResource("{instanceType}");
    const ec2region = ec2InstanceType.addResource("{region}");
    ec2region.addMethod("GET");

    new CfnOutput(this, "apiPath", {
      value: api.root.path,
      description: "Path of the API",
    });

    const dashboard = new Dashboard(
      this,
      `${props.applicationName}-dashboard`,
      { dashboardName: `${props.applicationName}-dashboard` }
    );
    dashboard.addWidgets(
      // Lambda
      this.buildWidget("Duration", "AWS/Lambda"),
      this.buildWidget("Throttle", "AWS/Lambda"),
      this.buildWidget("Invocations", "AWS/Lambda"),
      this.buildWidget("ConcurrentExecutions", "AWS/Lambda"),
      this.buildWidget("Errors", "AWS/Lambda"),

      // API Gateway
      this.buildWidget("5XXError", "AWS/ApiGateway"),
      this.buildWidget("4XXError", "AWS/ApiGateway"),
      this.buildWidget("IntegrationLatency", "AWS/ApiGateway"),
      this.buildWidget("Latency", "AWS/ApiGateway"),
      this.buildWidget("Count", "AWS/ApiGateway")
    );
  }

  buildWidget(metricName: string, namespace: string): GraphWidget {
    return new GraphWidget({
      title: metricName,
      left: [
        new Metric({
          namespace,
          metricName,
          label: metricName,
          statistic: "avg",
        }),
      ],
    });
  }
}
