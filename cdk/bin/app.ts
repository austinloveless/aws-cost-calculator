#!/usr/bin/env node
import * as dotenv from "dotenv";
import { App } from "@aws-cdk/core";
import { ApplicationStack } from "../lib/application-stack";
import { TrunkPipelineStack } from "../lib/trunk-pipeline-stack";
import { EnvironmentBasedPipelineStack } from "../lib/env-based-pipeline-stack";
import { GitFlowBasedPipelineStack } from "../lib/gitflow-pipeline-stack";
import * as envVar from "env-var";

dotenv.config();
const app = new App();

const applicationName = "aws-cost-calculator";

// GitHub Config
const gitHubOwner = envVar.get("GITHUB_OWNER").required().asString();
const gitHubRepo = envVar.get("GITHUB_REPO").required().asString();

// Account IDs
const rootAccountId = envVar.get("ROOT_ACCOUNT").required().asString();
const devAccountId = envVar.get("DEV_ACCOUNT").required().asString();
const stageAccountId = envVar.get("STAGE_ACCOUNT").required().asString();
const prodAccountId = envVar.get("PROD_ACCOUNT").required().asString();

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
