import Stripe from "stripe";
import { logger } from "../logger/logger";
import {
  deleteItem,
  getItemByEmail,
  getItemByIpAddress,
  putItemWithCustomerData,
  updateItem,
} from "./dynamodb.helper";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2020-08-27",
});

export const createCustomerSubscription = async (
  email: string,
  cardInformation: Record<any, any>,
  ipAddress: string
): Promise<string | unknown> => {
  const paymentMethodId = await createPaymentMethod(cardInformation);
  const customerId = await createCustomer(email, paymentMethodId);
  try {
    const subscription = await stripe.subscriptions.create({
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
    const customerRecord = await getItemByIpAddress(email);
    if (!customerRecord) {
      await putItemWithCustomerData(
        ipAddress,
        email,
        customerId,
        subscription.id
      );
    } else {
      await updateItem(ipAddress, email, customerId, subscription.id);
    }

    return `Successfully added ${email} to AWS Cost Calculator Subscription`;
  } catch (error) {
    logger.error(`Subscription Error: ${error}`);
    return error;
  }
};

export const cancelCustomerSubscription = async (
  email: string
): Promise<string | unknown> => {
  const customer = await getItemByEmail(email);

  try {
    await stripe.subscriptions.del(customer.subscriptionId);
    logger.info(`Successfully deleted Customer subscription ${email}`);
    await deleteItem(email);
    return `Successfully deleted Customer subscription ${email}`;
  } catch (error) {
    logger.error(`Error Deleting Subscription for ${email}: ${error}`);
    return error;
  }
};

export const getCustomerSubscription = async (
  email: string
): Promise<Record<any, any> | unknown> => {
  const customer = await getItemByEmail(email);
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
