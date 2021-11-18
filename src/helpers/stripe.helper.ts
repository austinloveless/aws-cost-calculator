import Stripe from "stripe";
import { logger } from "../logger/logger";

if (!process.env.STRIPE_SECRET_KEY || !process.env.PRODUCT_ID) {
  logger.error("The .env file is not configured.");
  process.env.STRIPE_SECRET_KEY
    ? ""
    : logger.error("Add STRIPE_SECRET_KEY to your .env file.");

  process.env.PRODUCT_ID
    ? ""
    : logger.error("Add PRODUCT_ID to your .env file.");
  process.exit();
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2020-08-27",
});

export const createCustomerSubscription = async (
  email: string,
  cardInformation: Record<any, any>
): Promise<string> => {
  const paymentMethodId = await createPaymentMethod(cardInformation);
  const customerId = await createCustomer(email, paymentMethodId);
  try {
    await stripe.subscriptions.create({
      customer: customerId,
      items: [
        {
          price: process.env.PRODUCT_ID,
          quantity: 1,
        },
      ],
      payment_behavior: "default_incomplete",
      expand: ["latest_invoice.payment_intent"],
    });
    logger.info(
      `Successfully added ${email} to AWS Cost Calculator Subscription`
    );
    return `Successfully added ${email} to AWS Cost Calculator Subscription`;
  } catch (error) {
    logger.error(`Subscription Error: ${error}`);
    return `Subscription Error ${error}`;
  }
};

export const cancelCustomerSubscription = async (
  email: string
): Promise<string> => {
  //   const customer = await getCustomer(email);

  try {
    const deletedSubscription = await stripe.subscriptions.del(
      "sub_1JxHEYBAgjAVYA3XOKzMRLKG"
    );
    console.log("deleted sub", deletedSubscription);
    logger.info(`Successfully deleted Customer subscription ${email}`);
    return `Successfully deleted Customer subscription ${email}`;
  } catch (error) {
    logger.error(`Error Deleting Subscription for ${email}: ${error}`);
    return `Error Deleting Subscription for ${email}: ${error}`;
  }
};

export const getCustomerSubscription = async (email: string) => {
  //   const customer = await getCustomer(email);
  try {
    const subscription = await stripe.subscriptions.list({
      customer: "cus_KcWHrd2qg1LRAz",
      status: "all",
      expand: ["data.default_payment_method"],
    });
    logger.info(`Successfully Returned customer subscription`);
    return subscription.data;
  } catch (error) {
    logger.error(`Error Returning Subscription: ${error}`);
    return `Error Returning Subscription: ${error}`;
  }
};

const getCustomer = async (email: string): Promise<Record<any, any>> => {
  // get customerID from DynamoDB
  return {};
};

const createCustomer = async (
  email: string,
  paymentMethodId: string
): Promise<string> => {
  try {
    const customer = await stripe.customers.create({
      email,
      payment_method: paymentMethodId,
    });
    logger.info(`Successfully created customer ${email}`);
    return customer.id;
  } catch (error) {
    logger.error(`Customer Error: ${error}`);
    return `Customer Error: ${error}`;
  }
};

const createPaymentMethod = async (
  cardInformation: Record<any, any>
): Promise<string> => {
  try {
    const { number, exp_month, exp_year, cvc } = cardInformation;
    const payment = await stripe.paymentMethods.create({
      type: "card",
      card: {
        number,
        exp_month,
        exp_year,
        cvc,
      },
    });
    logger.info("Payment Method Created");
    return payment.id;
  } catch (error) {
    logger.error(`Payment Error: ${error}`);
    return `Payment Error: ${error}`;
  }
};
