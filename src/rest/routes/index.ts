import express from "express";
import ec2Routes from "./ec2";
import lambdaRoutes from "./lambda";

const router = express.Router();

router.use("/ec2", ec2Routes);
router.use("/lambda", lambdaRoutes);

export default router;
