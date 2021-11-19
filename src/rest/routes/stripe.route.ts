import express from "express";
import { validate } from "express-validation";

const router = express.Router();

import {
  cancelCustomerSubscriptionHandler,
  createCustomerSubscriptionHandler,
  getCustomerSubscriptionHandler,
} from "../handlers";

router
  .route("/create-subscription")
  /** POST /api/stripe/create-subscription Creates Stripe Monthly Subscription */
  .post(createCustomerSubscriptionHandler);

router
  .route("/cancel-subscription")
  /** GET /api/stripe/cancel-subscription Cancels Subscription */
  .get(cancelCustomerSubscriptionHandler);

router
  .route("/get-subscription/")
  /** GET /api/stripe/get-subscription/ Returns Subscription Details */
  .get(getCustomerSubscriptionHandler);

export default router;
