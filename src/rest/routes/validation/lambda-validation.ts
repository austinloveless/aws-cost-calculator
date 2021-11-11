import { Joi } from "express-validation";
import { usageTypes } from "./types/lambda/usage-type";

export const lambdaValidations = {
  // GET /api/lambda/:usageType/
  getLambdaCost: {
    params: Joi.object({
      usageType: Joi.string()
        .valid(...usageTypes)
        .required(),
    }),
  },
};
