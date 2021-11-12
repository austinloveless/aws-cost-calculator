import { ServiceCodes } from "../../types/enums/serviceCodes.enum";
import { pricingGetProducts } from "../../helpers/pricing.helper";
import { TermTypes } from "../../types/enums/ec2.enum";
import { usageTypesInternal } from "./internalEnums/usageTypes";

export const lambdaResolver = {
  UsageTypes: usageTypesInternal,
  Query: {
    lambdaCost: async (_: any, args: any) => {
      const { usageType } = args.input;
      const response = await pricingGetProducts(
        ServiceCodes.AWSLambda,
        TermTypes.OnDemand,
        usageType
      );
      return response;
    },
  },
};
