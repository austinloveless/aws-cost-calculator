import { baseError } from "../../errors/base-error.error";
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
  const response: any = await createCustomerSubscription(
    email,
    cardInformation,
    req.socket.remoteAddress
  );
  if (response instanceof Error) {
    baseError(response, res);
  }
  return res.json({ statusCode: 200, response });
};

export const cancelCustomerSubscriptionHandler = async (
  req: any,
  res: any
): Promise<Express.Response> => {
  const { email } = req.body;
  const response: any = await cancelCustomerSubscription(email);

  if (response instanceof Error) {
    baseError(response, res);
  }
  return res.json({
    statusCode: 200,
    response,
  });
};

export const getCustomerSubscriptionHandler = async (
  req: any,
  res: any
): Promise<Express.Response> => {
  const { email } = req.body;

  const response: any = await getCustomerSubscription(email);
  if (response instanceof Error) {
    baseError(response, res);
  }
  return res.json({
    statusCode: 200,
    response,
  });
};
