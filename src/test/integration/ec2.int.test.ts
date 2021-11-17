import app from "../../app";
import request from "supertest";
import { ec2ValidationMock, ec2PricingMock } from "./mocks/ec2-route.mock";
import regionsMock from "./mocks/region-validation.mock";

describe("GET /api/ec2/:instanceType/:region", () => {
  it("should return cost by usageType for AWS ec2", async () => {
    const { body } = await request(app).get("/api/ec2/t2.micro/us-east-1");
    expect(body).toEqual(ec2PricingMock);
  });
  it("should return validation error when passed an incorrect parameter", async () => {
    const { body } = await request(app).get("/api/ec2/incorrect/us-east-1");
    expect(body).toEqual(ec2ValidationMock);
  });

  it("should return validation error when passed an incorrect parameter", async () => {
    const { body } = await request(app).get("/api/ec2/t2.micro/incorrect");
    expect(body).toEqual(regionsMock);
  });
});
