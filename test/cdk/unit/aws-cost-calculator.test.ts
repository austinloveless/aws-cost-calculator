import "@aws-cdk/assert/jest";
import { App } from "@aws-cdk/core";
import { AWSCostCalculator } from "../../../cdk/lib/aws-cost-calculator";

test("Lambda Function created with correct values", () => {
  const app = new App();
  const stack = new AWSCostCalculator(app, "aws-cost-calculator");

  expect(stack).toHaveResource("AWS::Lambda::Function", {
    FunctionName: "aws-cost-calculator",
    Runtime: "nodejs14.x",
    Handler: "dist/lambda.handler",
  });
});

test("API Gateway created with correct values", () => {
  const app = new App();
  const stack = new AWSCostCalculator(app, "aws-cost-calculator");

  expect(stack).toHaveResource("AWS::ApiGateway::RestApi", {
    Name: "aws-cost-calculator-api",
  });
});

test("API Gateway has correct methods", () => {
  const app = new App();
  const stack = new AWSCostCalculator(app, "aws-cost-calculator");

  expect(stack).toHaveResource("AWS::ApiGateway::Resource", {
    PathPart: "graphql",
  });
});
