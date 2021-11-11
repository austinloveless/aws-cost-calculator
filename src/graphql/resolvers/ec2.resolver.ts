import { ServiceCodes } from "../../types/enums/serviceCodes.enum";
import { pricingGetProducts } from "../../helpers/pricing.helper";
import { TermTypes } from "../../types/enums/ec2.enum";

export const ec2Resolver = {
  Query: {
    ec2IntanceCost: async (_: any, args: any) => {
      const { instanceType, region } = args;
      const response = await pricingGetProducts(
        ServiceCodes.AmazonEC2,
        TermTypes.OnDemand,
        instanceType,
        region
      );
      return response;
    },
  },
};
