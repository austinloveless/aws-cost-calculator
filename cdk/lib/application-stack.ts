import { Stack, Construct, CfnOutput, StackProps } from "@aws-cdk/core";
import { LambdaRestApi } from "@aws-cdk/aws-apigateway";
import {
  Function,
  Runtime,
  Code,
  IFunction,
  CfnParametersCode,
} from "@aws-cdk/aws-lambda";

interface ApplicationStackProps extends StackProps {
  applicationName: string;
  stage: string;
}

export class ApplicationStack extends Stack {
  public readonly lambdaCode: CfnParametersCode;
  readonly handler: IFunction;

  constructor(scope: Construct, id: string, props: ApplicationStackProps) {
    super(scope, id, props);

    this.lambdaCode = Code.fromCfnParameters();

    const handler = new Function(
      this,
      `${props.applicationName}-${props.stage}`,
      {
        runtime: Runtime.NODEJS_14_X,
        code: this.lambdaCode,
        handler: "dist/lambda.handler",
        functionName: `${props.applicationName}-${props.stage}`,
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

    api.root.addMethod("GET");
    const graphql = api.root.addResource("graphql");
    graphql.addMethod("ANY");

    new CfnOutput(this, "apiPath", {
      value: api.root.path,
      description: "Path of the API",
    });
  }
}
