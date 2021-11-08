import { Stack } from "@aws-cdk/core";
import "@aws-cdk/assert/jest";

import { AWSCostCalculator } from "../../cdk/lib/aws-cost-calculator";

test("Creates AWSCostCalculator Stack", () => {
  const stack = new Stack();

  new AWSCostCalculator(stack, "aws-cost-calculator");

  expect(stack);
});
