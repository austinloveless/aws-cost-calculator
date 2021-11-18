import dotenv from "dotenv";
import AWS from "aws-sdk";
import { Regions } from "../types/enums/regions.enum";
import { TermTypes, InstanceTypes } from "../types/enums/ec2.enum";
import { ServiceCodes } from "../types/enums/serviceCodes.enum";
import { locationToRegion } from "./location-to-region.helper";
import { LambdaUsageTypes } from "../types/enums/lambda.enum";
import { logger } from "../logger/logger";

dotenv.config();

export const pricingGetProducts = async (
  serviceCode: ServiceCodes,
  termType: TermTypes,
  metric: InstanceTypes | LambdaUsageTypes,
  region?: Regions
): Promise<AWS.Pricing.GetProductsResponse | AWS.AWSError | unknown> => {
  const pricing = new AWS.Pricing({
    apiVersion: "2017-10-15",
    region: process.env.AWS_REGION || "us-east-1",
  });

  const params = {
    Filters: buildFilter(serviceCode, termType, metric, region),
    MaxResults: 1,
    ServiceCode: serviceCode,
  };
  try {
    const products = await pricing.getProducts(params).promise();
    logger.info(`Successfully Returned ${serviceCode} product prices`);
    return products;
  } catch (err) {
    logger.error(err);
    return err;
  }
};

const buildFilter = (
  serviceCode: ServiceCodes,
  termType: TermTypes,
  metric: InstanceTypes | LambdaUsageTypes,
  region?: Regions
) => {
  switch (serviceCode) {
    case ServiceCodes.AWSLambda:
      return [
        {
          Type: "TERM_MATCH",
          Field: "usagetype",
          Value: metric,
        },
      ];
    case ServiceCodes.AmazonEC2:
      return [
        {
          Type: "TERM_MATCH",
          Field: "location",
          Value: locationToRegion(region),
        },
        { Type: "TERM_MATCH", Field: "termType", Value: termType },
        {
          Type: "TERM_MATCH",
          Field: "instanceType",
          Value: metric,
        },
      ];
  }
};
