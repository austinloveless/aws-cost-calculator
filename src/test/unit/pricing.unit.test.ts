import AWSMock from "aws-sdk-mock";
import { pricingGetProducts } from "../../helpers/pricing.helper";
import { ServiceCodes } from "../../types/enums/serviceCodes.enum";
import { InstanceTypes, TermTypes } from "../../types/enums/ec2.enum";
import { LambdaUsageTypes } from "../../types/enums/lambda.enum";
import { Regions } from "../../types/enums/regions.enum";
import ec2PricingMock from "./mocks/ec2-pricing.mock";
import lambdaPricingMock from "./mocks/lambda-pricing.mock";

describe("Return Pricing Details for a Given AWS Product", () => {
  afterEach(() => {
    AWSMock.restore("Pricing");
  });
  it("should return pricing information for EC2", async () => {
    AWSMock.mock("Pricing", "getProducts", ec2PricingMock);
    const response = await pricingGetProducts(
      ServiceCodes.AmazonEC2,
      TermTypes.OnDemand,
      InstanceTypes["t2.micro"],
      Regions["us-east-1"]
    );
    expect(response).toEqual(ec2PricingMock);
  });

  it("should return pricing information for Lambda", async () => {
    AWSMock.mock("Pricing", "getProducts", lambdaPricingMock);
    const response = await pricingGetProducts(
      ServiceCodes.AWSLambda,
      TermTypes.OnDemand,
      LambdaUsageTypes["APN1-Lambda-Edge-GB-Second"]
    );
    expect(response).toEqual(lambdaPricingMock);
  });
});
