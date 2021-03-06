import { Joi } from "express-validation";
import { usageTypes } from "./types/lambda/usage-type.type";

export const lambdaValidations: any = {
  // GET /api/lambda/:usageType/
  getLambdaCost: {
    params: Joi.object({
      usageType: Joi.string()
        .valid(...usageTypes)
        .required(),
    }),
  },
};
