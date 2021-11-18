import { Dashboard } from "@aws-cdk/aws-cloudwatch";
import { GraphWidget, Metric } from "@aws-cdk/aws-cloudwatch";
import { Construct, NestedStack, StackProps } from "@aws-cdk/core";

interface CloudwatchStackProps extends StackProps {
  applicationName: string;
  stage: string;
}

export class CloudWatchDashboard extends NestedStack {
  constructor(scope: Construct, id: string, props: CloudwatchStackProps) {
    super(scope, id);

    const dashboard = new Dashboard(
      this,
      `${props.applicationName}-dashboard`,
      { dashboardName: `${props.applicationName}-dashboard` }
    );
    dashboard.addWidgets(
      // Lambda
      this.buildWidget("Duration", "AWS/Lambda"),
      this.buildWidget("Throttle", "AWS/Lambda"),
      this.buildWidget("Invocations", "AWS/Lambda"),
      this.buildWidget("ConcurrentExecutions", "AWS/Lambda"),
      this.buildWidget("Errors", "AWS/Lambda"),

      // API Gateway
      this.buildWidget("5XXError", "AWS/ApiGateway"),
      this.buildWidget("4XXError", "AWS/ApiGateway"),
      this.buildWidget("IntegrationLatency", "AWS/ApiGateway"),
      this.buildWidget("Latency", "AWS/ApiGateway"),
      this.buildWidget("Count", "AWS/ApiGateway")
    );
  }

  buildWidget(metricName: string, namespace: string): GraphWidget {
    return new GraphWidget({
      width: 24,
      title: metricName,
      left: [
        new Metric({
          namespace,
          metricName,
          label: metricName,
          statistic: "avg",
        }),
      ],
    });
  }
}
