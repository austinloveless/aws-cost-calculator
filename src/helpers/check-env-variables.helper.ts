import { logger } from "../logger/logger";

export const checkEnvVars = () => {
  if (
    !process.env.STRIPE_SECRET_KEY ||
    !process.env.PRODUCT_ID ||
    !process.env.TABLE_NAME
  ) {
    logger.error("The .env file is not configured.");
    process.env.STRIPE_SECRET_KEY
      ? ""
      : logger.error("Add STRIPE_SECRET_KEY to your .env file.");

    process.env.PRODUCT_ID
      ? ""
      : logger.error("Add PRODUCT_ID to your .env file.");

    process.env.TABLE_NAME
      ? ""
      : logger.error("Add TABLE_NAME to your .env file.");
    process.exit();
  }
};
