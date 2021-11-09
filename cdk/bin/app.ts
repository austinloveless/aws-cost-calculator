#!/usr/bin/env node
import * as dotenv from "dotenv";
import { App } from "@aws-cdk/core";
import { ApplicationStack } from "../lib/application-stack";
import { PipelineStack } from "../lib/pipeline-stack";

dotenv.config();
const app = new App();

const applicationName = "aws-cost-calculator";

// GitHub Config
const gitHubOwner = process.env.GITHUB_OWNER || "austinloveless";
const gitHubRepo = process.env.GITHUB_REPO || "aws-cost-calculator";
const gitHubBranch = process.env.GITHUB_BRANCH || "main";

// Account IDs
const devAccountId =
  process.env.DEV_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT || "";
const stageAccountId =
  process.env.STAGE_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT || "";
const prodAccountId =
  process.env.PROD_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT || "";

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

// Pipeline Stack
new PipelineStack(app, "CrossAccountPipelineStack", {
  devApplicationStack,
  stageApplicationStack,
  prodApplicationStack,
  prodAccountId,
  devAccountId,
  stageAccountId,
  gitHubOwner,
  gitHubRepo,
  gitHubBranch,
});
