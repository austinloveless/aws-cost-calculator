import { Joi } from "express-validation";
import { regions } from "./types/regions";
import { instanceTypes } from "./types/ec2/instance-types";

export const ec2Validations = {
  // GET /api/ec2/:instanceType/:region
  getEc2InstanceCost: {
    params: Joi.object({
      instanceType: Joi.string()
        .valid(...instanceTypes)
        .required(),
      region: Joi.string()
        .valid(...regions)
        .required(),
    }),
  },
};
