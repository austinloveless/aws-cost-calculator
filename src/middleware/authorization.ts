import { getItemByIpAddress } from "../helpers/dynamodb.helper";

export const authorizeIpAddressByUsage = async (
  req: any,
  res: any,
  next: any
) => {
  const ipAddress = req.socket.remoteAddress;

  const customerRecord = await getItemByIpAddress(ipAddress);

  if (customerRecord.numberOfRequests > 50 && !customerRecord.email) {
    return res.status(401).json({
      message: `User at ${ipAddress} has exceeded 50 requests for the day. Sign up for a paid account to continue making requests.`,
      REST: "POST /api/stripe/create-membership",
      GraphQL: "Mutation createCustomerSubscription",
    });
  }
  next();
};
