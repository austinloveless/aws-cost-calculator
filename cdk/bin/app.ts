#!/usr/bin/env node
import "source-map-support/register";
import { App } from "@aws-cdk/core";

import { AWSCostCalculator } from "../lib/aws-cost-calculator";

const app = new App();

new AWSCostCalculator(app, "AWSCostCalculator");
