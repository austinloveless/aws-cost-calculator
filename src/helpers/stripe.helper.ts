import Stripe from "stripe";
import { logger } from "../logger/logger";
import { getItemByIpAddress, putItem } from "./dynamodb.helper";
import * as envVar from "env-var";

const STRIPE_SECRET_KEY = envVar.get("STRIPE_SECRET_KEY").required().asString();
const PRODUCT_ID = envVar.get("PRODUCT_ID").required().asString();

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

export const createCustomerSubscription = async (
  email: string,
  cardInformation: Record<any, any>,
  ipAddress: string
): Promise<string | any> => {
  const priceId = await createPriceId();
  const paymentMethodId = await createPaymentMethod(cardInformation);
  const customerId = await createCustomer(email, paymentMethodId);
  try {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      payment_behavior: "default_incomplete",
      expand: ["latest_invoice.payment_intent"],
    });
    logger.info(
      `Successfully added ${email} to AWS Cost Calculator Subscription`
    );
    await putItem(ipAddress, email, customerId, subscription.id);

    return `Successfully added ${email} to AWS Cost Calculator Subscription`;
  } catch (error) {
    logger.error(`Subscription Error: ${error}`);
    return error;
  }
};

export const cancelCustomerSubscription = async (
  ipAddress: string
): Promise<boolean | any> => {
  const customer: any = await getItemByIpAddress(ipAddress);
  try {
    await stripe.subscriptions.del(customer.subscriptionId);
    logger.info(`Successfully canceled Customer subscription ${ipAddress}`);
    return `Successfully canceled Customer subscription ${ipAddress}`;
  } catch (error) {
    logger.error(`Error Deleting Subscription for ${ipAddress}: ${error}`);
    return error;
  }
};

export const getCustomerSubscription = async (
  ipAddress: string
): Promise<Record<any, any> | any> => {
  const customer: any = await getItemByIpAddress(ipAddress);
  try {
    const subscription = await stripe.subscriptions.list({
      customer: customer.id,
      status: "all",
      expand: ["data.default_payment_method"],
    });
    logger.info("Successfully Returned customer subscription");
    return subscription.data;
  } catch (error) {
    logger.error(`Error Returning Subscription: ${error}`);
    return error;
  }
};

const createPriceId = async (): Promise<string> => {
  try {
    const price = await stripe.prices.create({
      unit_amount: 500,
      currency: "usd",
      recurring: { interval: "month" },
      product: PRODUCT_ID,
    });
    return price.id;
  } catch (error) {
    logger.error(`Price Error: ${error}`);
    return `Price Error: ${error}`;
  }
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
