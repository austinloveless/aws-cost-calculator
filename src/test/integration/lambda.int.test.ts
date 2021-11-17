import app from "../../app";
import request from "supertest";
import { lambdaValidationMock } from "./mocks/lambda-route.mock";

describe("GET /api/lambda/:usageType", () => {
  it("should return validation error when passed an incorrect parameter", async () => {
    const { body } = await request(app).get("/api/lambda/incorrect");
    expect(body).toEqual(lambdaValidationMock);
  });
});
