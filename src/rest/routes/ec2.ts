import express from "express";
import { validate } from "express-validation";
import { ec2Validations } from "./validation/ec2-validation";
const router = express.Router();

import { getEc2InstanceCost } from "../handlers";

router
  .route("/:instanceType/:region")
  /** GET /api/ec2/:instanceType/:region Cost of EC2 Instance By Type and Region */
  .get(validate(ec2Validations.getEc2InstanceCost), getEc2InstanceCost);

export default router;
