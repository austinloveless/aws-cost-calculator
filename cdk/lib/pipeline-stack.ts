import { Role, AccountPrincipal, PolicyStatement } from "@aws-cdk/aws-iam";
import {
  App,
  Stack,
  StackProps,
  RemovalPolicy,
  CfnOutput,
  CfnCapabilities,
} from "@aws-cdk/core";

import { ApplicationStack } from "../lib/application-stack";
import {
  BuildSpec,
  LinuxBuildImage,
  PipelineProject,
} from "@aws-cdk/aws-codebuild";
import {
  CloudFormationCreateUpdateStackAction,
  CodeBuildAction,
  GitHubSourceAction,
  ManualApprovalAction,
} from "@aws-cdk/aws-codepipeline-actions";
import { Artifact, Pipeline } from "@aws-cdk/aws-codepipeline";
import { Secret } from "@aws-cdk/aws-secretsmanager";
import { Key } from "@aws-cdk/aws-kms";
import { Bucket, BucketEncryption } from "@aws-cdk/aws-s3";

export interface PipelineStackProps extends StackProps {
  readonly devApplicationStack: ApplicationStack;
  readonly stageApplicationStack: ApplicationStack;
  readonly prodApplicationStack: ApplicationStack;
  readonly rootAccountId: string;
  readonly devAccountId: string;
  readonly stageAccountId: string;
  readonly prodAccountId: string;
  readonly gitHubOwner: string;
  readonly gitHubRepo: string;
  readonly gitHubBranch: string;
}

export class PipelineStack extends Stack {
  constructor(app: App, id: string, props: PipelineStackProps) {
    super(app, id, props);

    const gitHubSecret = Secret.fromSecretCompleteArn(
      this,
      "github-secret",
      `arn:aws:secretsmanager:us-east-1:${props.rootAccountId}:secret:github-secret-bEZ24D`
    );

    const sourceOutput = new Artifact();

    const sourceAction = new GitHubSourceAction({
      actionName: "GitHub_Source",
      owner: props.gitHubOwner,
      repo: props.gitHubRepo,
      branch: props.gitHubBranch,
      oauthToken: gitHubSecret.secretValue,
      output: sourceOutput,
    });

    //dev
    const devDeploymentRole = Role.fromRoleArn(
      this,
      "DevDeploymentRole",
      `arn:aws:iam::${props.devAccountId}:role/CloudFormationDeploymentRole`,
      {
        mutable: false,
      }
    );
    const devCrossAccountRole = Role.fromRoleArn(
      this,
      "DevCrossAccountRole",
      `arn:aws:iam::${props.devAccountId}:role/CodePipelineCrossAccountRole`,
      {
        mutable: false,
      }
    );

    //stage
    const stageDeploymentRole = Role.fromRoleArn(
      this,
      "StageDeploymentRole",
      `arn:aws:iam::${props.stageAccountId}:role/CloudFormationDeploymentRole`,
      {
        mutable: false,
      }
    );
    const stageCrossAccountRole = Role.fromRoleArn(
      this,
      "StageCrossAccountRole",
      `arn:aws:iam::${props.stageAccountId}:role/CodePipelineCrossAccountRole`,
      {
        mutable: false,
      }
    );

    //prod
    const prodDeploymentRole = Role.fromRoleArn(
      this,
      "ProdDeploymentRole",
      `arn:aws:iam::${props.prodAccountId}:role/CloudFormationDeploymentRole`,
      {
        mutable: false,
      }
    );

    const prodCrossAccountRole = Role.fromRoleArn(
      this,
      "ProdCrossAccountRole",
      `arn:aws:iam::${props.prodAccountId}:role/CodePipelineCrossAccountRole`,
      {
        mutable: false,
      }
    );

    // dev
    const devAccountRootPrincipal = new AccountPrincipal(props.devAccountId);

    //stage
    const stageAccountRootPrincipal = new AccountPrincipal(
      props.stageAccountId
    );

    //prod
    const prodAccountRootPrincipal = new AccountPrincipal(props.prodAccountId);

    const key = new Key(this, "ArtifactKey", {
      alias: "key/artifact-key",
    });

    //dev
    key.grantDecrypt(devAccountRootPrincipal);
    key.grantDecrypt(devCrossAccountRole);

    //stage
    key.grantDecrypt(stageAccountRootPrincipal);
    key.grantDecrypt(stageCrossAccountRole);

    //prod
    key.grantDecrypt(prodAccountRootPrincipal);
    key.grantDecrypt(prodCrossAccountRole);

    const artifactBucket = new Bucket(this, "ArtifactBucket", {
      bucketName: `artifact-bucket-${this.account}`,
      removalPolicy: RemovalPolicy.DESTROY,
      encryption: BucketEncryption.KMS,
      encryptionKey: key,
    });

    // dev
    artifactBucket.grantPut(devAccountRootPrincipal);
    artifactBucket.grantRead(devAccountRootPrincipal);

    // stage
    artifactBucket.grantPut(stageAccountRootPrincipal);
    artifactBucket.grantRead(stageAccountRootPrincipal);

    // prod
    artifactBucket.grantPut(prodAccountRootPrincipal);
    artifactBucket.grantRead(prodAccountRootPrincipal);

    const cdkBuild = new PipelineProject(this, "CdkBuild", {
      buildSpec: BuildSpec.fromObject({
        version: "0.2",
        phases: {
          install: {
            commands: ["npm install", "cd src", "npm install", "cd ../"],
          },
          build: {
            commands: ["npm run build", "npx cdk synth --all -o dist"],
          },
        },
        artifacts: {
          "base-directory": "dist",
          files: ["*ApplicationStack.template.json"],
        },
      }),
      environment: {
        buildImage: LinuxBuildImage.AMAZON_LINUX_2_2,
      },
      encryptionKey: key,
    });
    const lambdaBuild = new PipelineProject(this, "ApplicationBuild", {
      buildSpec: BuildSpec.fromObject({
        version: "0.2",
        phases: {
          install: {
            commands: ["npm install", "cd src", "npm install"],
          },
          build: {
            commands: ["npm run build:src"],
          },
        },
        artifacts: {
          "base-directory": "src",
          files: ["index.js", "node_modules/**/*"],
        },
      }),
      environment: {
        buildImage: LinuxBuildImage.AMAZON_LINUX_2_2,
      },
      encryptionKey: key,
    });

    const cdkBuildOutput = new Artifact("CdkBuildOutput");
    const lambdaBuildOutput = new Artifact("LambdaBuildOutput");

    const pipeline = new Pipeline(this, "Pipeline", {
      pipelineName: "CrossAccountPipeline",
      artifactBucket: artifactBucket,
      stages: [
        {
          stageName: "Source",
          actions: [sourceAction],
        },
        {
          stageName: "Build",
          actions: [
            new CodeBuildAction({
              actionName: "Application_Build",
              project: lambdaBuild,
              input: sourceOutput,
              outputs: [lambdaBuildOutput],
            }),
            new CodeBuildAction({
              actionName: "CDK_Synth",
              project: cdkBuild,
              input: sourceOutput,
              outputs: [cdkBuildOutput],
            }),
          ],
        },
        {
          stageName: "dev",
          actions: [
            new CloudFormationCreateUpdateStackAction({
              actionName: "Deploy",
              templatePath: cdkBuildOutput.atPath(
                "DevApplicationStack.template.json"
              ),
              stackName: "DevApplicationDeploymentStack",
              adminPermissions: true,
              parameterOverrides: {
                ...props.prodApplicationStack.lambdaCode.assign(
                  lambdaBuildOutput.s3Location
                ),
              },
              deploymentRole: devDeploymentRole,
              cfnCapabilities: [
                CfnCapabilities.ANONYMOUS_IAM,
                CfnCapabilities.NAMED_IAM,
              ],
              extraInputs: [lambdaBuildOutput],
              role: devCrossAccountRole,
            }),
          ],
        },
        {
          stageName: "stage",
          actions: [
            new ManualApprovalAction({
              actionName: "manual-approval-stage",
            }),
            new CloudFormationCreateUpdateStackAction({
              actionName: "Deploy",
              templatePath: cdkBuildOutput.atPath(
                "StageApplicationStack.template.json"
              ),
              stackName: "StageApplicationDeploymentStack",
              adminPermissions: true,
              parameterOverrides: {
                ...props.prodApplicationStack.lambdaCode.assign(
                  lambdaBuildOutput.s3Location
                ),
              },
              deploymentRole: stageDeploymentRole,
              cfnCapabilities: [
                CfnCapabilities.ANONYMOUS_IAM,
                CfnCapabilities.NAMED_IAM,
              ],
              extraInputs: [lambdaBuildOutput],
              role: stageCrossAccountRole,
            }),
          ],
        },
        {
          stageName: "prod",
          actions: [
            new ManualApprovalAction({
              actionName: "manual-approval-prod",
            }),
            new CloudFormationCreateUpdateStackAction({
              actionName: "Deploy",
              templatePath: cdkBuildOutput.atPath(
                "ProdApplicationStack.template.json"
              ),
              stackName: "ProdApplicationDeploymentStack",
              adminPermissions: true,
              parameterOverrides: {
                ...props.prodApplicationStack.lambdaCode.assign(
                  lambdaBuildOutput.s3Location
                ),
              },
              deploymentRole: prodDeploymentRole,
              cfnCapabilities: [
                CfnCapabilities.ANONYMOUS_IAM,
                CfnCapabilities.NAMED_IAM,
              ],
              extraInputs: [lambdaBuildOutput],
              role: prodCrossAccountRole,
            }),
          ],
        },
      ],
    });

    pipeline.addToRolePolicy(
      new PolicyStatement({
        actions: ["sts:AssumeRole"],
        resources: [`arn:aws:iam::${props.devAccountId}:role/*`],
      })
    );

    pipeline.addToRolePolicy(
      new PolicyStatement({
        actions: ["sts:AssumeRole"],
        resources: [`arn:aws:iam::${props.stageAccountId}:role/*`],
      })
    );

    pipeline.addToRolePolicy(
      new PolicyStatement({
        actions: ["sts:AssumeRole"],
        resources: [`arn:aws:iam::${props.prodAccountId}:role/*`],
      })
    );

    new CfnOutput(this, "ArtifactBucketEncryptionKeyArn", {
      value: key.keyArn,
      exportName: "ArtifactBucketEncryptionKey",
    });
  }
}
