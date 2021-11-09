import { SynthUtils } from "@aws-cdk/assert";
import * as cdk from "@aws-cdk/core";

import { ApplicationStack } from "../../../cdk/lib/application-stack";

test("aws-cost-calculator stack", () => {
  const app = new cdk.App();
  const stack = new ApplicationStack(app, "aws-cost-calculator", {
    stage: "test",
    applicationName: "aws-cost-calculator",
  });
  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
});
