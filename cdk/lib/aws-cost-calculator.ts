import { Stack, Construct, CfnOutput } from "@aws-cdk/core";
import { LambdaRestApi } from "@aws-cdk/aws-apigateway";
import { Function, Runtime, Code, IFunction } from "@aws-cdk/aws-lambda";

export class AWSCostCalculator extends Stack {
  readonly handler: IFunction;

  constructor(scope: Construct, id: string, props?: undefined) {
    super(scope, id, props);

    const handler = new Function(this, "aws-cost-calculator", {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset("src"),
      handler: "dist/lambda.handler",
      functionName: "aws-cost-calculator",
    });

    const api = new LambdaRestApi(this, "aws-cost-calculator-api", {
      handler,
      proxy: false,
      restApiName: "aws-cost-calculator-api",
    });

    api.root.addMethod("GET");
    const github = api.root.addResource("github");
    github.addMethod("GET");

    new CfnOutput(this, "apiPath", {
      value: api.root.path,
      description: "Path of the API",
    });
  }
}
