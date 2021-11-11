import express from "express";
import { validate } from "express-validation";
import { lambdaValidations } from "./validation/lambda.validation";
const router = express.Router();

import { getLambdaCost } from "../handlers";

router
  .route("/:usageType")
  /** GET /api/lambda/:usageType/ Cost of AWS Lambda by usageType */
  .get(validate(lambdaValidations.getLambdaCost), getLambdaCost);

export default router;
