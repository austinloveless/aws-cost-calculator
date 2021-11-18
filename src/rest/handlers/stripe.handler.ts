import {
  createCustomerSubscription,
  cancelCustomerSubscription,
  getCustomerSubscription,
} from "../../helpers/stripe.helper";

export const createCustomerSubscriptionHandler = async (
  req: any,
  res: any
): Promise<Express.Response> => {
  const { email, cardInformation } = req.body;
  return res.json({
    statusCode: 200,
    message: await createCustomerSubscription(email, cardInformation),
  });
};

export const cancelCustomerSubscriptionHandler = async (
  req: any,
  res: any
): Promise<Express.Response> => {
  const { email } = req.body;

  return res.json({
    statusCode: 200,
    message: await cancelCustomerSubscription(email),
  });
};

export const getCustomerSubscriptionHandler = async (
  req: any,
  res: any
): Promise<Express.Response> => {
  const { email } = req.body;
  return res.json({
    statusCode: 200,
    message: await getCustomerSubscription(email),
  });
};
