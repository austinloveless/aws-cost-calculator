#!/usr/bin/env node
import * as dotenv from "dotenv";
import { App } from "@aws-cdk/core";
import { ApplicationStack } from "../lib/application-stack";
import { TrunkPipelineStack } from "../lib/trunk-pipeline-stack";
import { EnvironmentBasedPipelineStack } from "../lib/env-based-pipeline-stack";
import { GitFlowBasedPipelineStack } from "../lib/gitflow-pipeline-stack";

dotenv.config();
const app = new App();

const applicationName = "aws-cost-calculator";

// GitHub Config
const gitHubOwner = process.env.GITHUB_OWNER ?? "austinloveless";
const gitHubRepo = process.env.GITHUB_REPO ?? "aws-cost-calculator";

// Account IDs
const rootAccountId = process.env.ROOT_ACCOUNT ?? "";
const devAccountId = process.env.DEV_ACCOUNT ?? "";
const stageAccountId = process.env.STAGE_ACCOUNT ?? "";
const prodAccountId = process.env.PROD_ACCOUNT ?? "";

// Application Stacks
const devApplicationStack = new ApplicationStack(app, "DevApplicationStack", {
  applicationName,
  stage: "dev",
});

const stageApplicationStack = new ApplicationStack(
  app,
  "StageApplicationStack",
  {
    applicationName,
    stage: "stage",
  }
);

const prodApplicationStack = new ApplicationStack(app, "ProdApplicationStack", {
  applicationName,
  stage: "prod",
});

// Trunk Pipeline Stack
new TrunkPipelineStack(app, "TrunkCrossAccountPipelineStack", {
  devApplicationStack,
  stageApplicationStack,
  prodApplicationStack,
  rootAccountId,
  prodAccountId,
  devAccountId,
  stageAccountId,
  gitHubOwner,
  gitHubRepo,
});

// Environment Based pipeline Stack
new EnvironmentBasedPipelineStack(app, "EnvBasedCrossAccountPipelineStack", {
  devApplicationStack,
  stageApplicationStack,
  prodApplicationStack,
  rootAccountId,
  prodAccountId,
  devAccountId,
  stageAccountId,
  gitHubOwner,
  gitHubRepo,
});

// GitFlow Based pipeline Stack
new GitFlowBasedPipelineStack(app, "GitFlowCrossAccountPipelineStack", {
  devApplicationStack,
  stageApplicationStack,
  prodApplicationStack,
  rootAccountId,
  prodAccountId,
  devAccountId,
  stageAccountId,
  gitHubOwner,
  gitHubRepo,
});
