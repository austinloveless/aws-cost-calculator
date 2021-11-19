import {
  createCustomerSubscription,
  getCustomerSubscription,
  cancelCustomerSubscription,
} from "../../helpers/stripe.helper";

export const stripeResolver = {
  Query: {
    getCustomerSubscription: async (_: any, args: any, req: any) => {
      const ipAddress = req.client._peername.address;

      const response = await getCustomerSubscription(ipAddress);
      return response;
    },

    cancelCustomerSubscription: async (_: any, args: any, req: any) => {
      const ipAddress = req.client._peername.address;
      const response = await cancelCustomerSubscription(ipAddress);
      return response;
    },
  },
  Mutation: {
    createCustomerSubscription: async (_: any, args: any, req: any) => {
      const { email, cardInformation } = args.input;
      const ipAddress = req.client._peername.address;

      const response = createCustomerSubscription(
        email,
        cardInformation,
        ipAddress
      );
      return response;
    },
  },
};
