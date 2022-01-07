// import "@aws-cdk/assert/jest";
// import { App } from "@aws-cdk/core";
// import { ApplicationStack } from "../../cdk/lib/application-stack";

// const stage = "test";
// const applicationName = "aws-cost-calculator";

// test("Lambda Function created with correct values", () => {
//   const app = new App();
//   const stack = new ApplicationStack(app, "aws-cost-calculator", {
//     stage,
//     applicationName,
//   });

//   expect(stack).toHaveResource("AWS::Lambda::Function", {
//     FunctionName: `${applicationName}-${stage}`,
//     Runtime: "nodejs14.x",
//     Handler: "dist/lambda.handler",
//     Role: {
//       "Fn::GetAtt": ["lambdaroleDFE21467", "Arn"],
//     },
//   });
// });

// test("API Gateway created with correct values", () => {
//   const app = new App();
//   const stack = new ApplicationStack(app, "aws-cost-calculator", {
//     stage,
//     applicationName,
//   });

//   expect(stack).toHaveResource("AWS::ApiGateway::RestApi", {
//     Name: `${applicationName}-api-${stage}`,
//   });
// });

// test("API Gateway has correct methods", () => {
//   const app = new App();
//   const stack = new ApplicationStack(app, "aws-cost-calculator", {
//     stage,
//     applicationName,
//   });

//   expect(stack).toHaveResource("AWS::ApiGateway::Resource", {
//     PathPart: "graphql",
//   });
// });
