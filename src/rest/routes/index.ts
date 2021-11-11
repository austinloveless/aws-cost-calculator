import express from "express";
import ec2Routes from "./ec2.route";
import lambdaRoutes from "./lambda.route";

const router = express.Router();

router.use("/ec2", ec2Routes);
router.use("/lambda", lambdaRoutes);

export default router;
