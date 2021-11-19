import { ServiceCodes } from "../../types/enums/serviceCodes.enum";
import { pricingGetProducts } from "../../helpers/pricing.helper";
import { TermTypes } from "../../types/enums/ec2.enum";
import { usageTypesInternal } from "./internalEnums/usageTypes";
import {
  getItemByIpAddress,
  putItem,
  updateNumberOfRequestsCount,
} from "../../helpers/dynamodb.helper";

export const lambdaResolver = {
  UsageTypes: usageTypesInternal,
  Query: {
    lambdaCost: async (_: any, args: any, req: any) => {
      const ipAddress = req.client._peername.address;

      const customerRecord = await getItemByIpAddress(ipAddress);
      if (!customerRecord) {
        await putItem(ipAddress);
      }
      await updateNumberOfRequestsCount(ipAddress);

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
