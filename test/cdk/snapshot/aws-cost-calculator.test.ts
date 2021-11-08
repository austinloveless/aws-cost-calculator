import { SynthUtils } from "@aws-cdk/assert";
import * as cdk from "@aws-cdk/core";

import { AWSCostCalculator } from "../../../cdk/lib/aws-cost-calculator";

test("aws-cost-calculator stack", () => {
  const app = new cdk.App();
  const stack = new AWSCostCalculator(app, "aws-cost-calculator");
  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
});
