import { ServiceCodes } from "../../types/enums/serviceCodes.enum";
import { pricingGetProducts } from "../../helpers/pricing.helper";
import { TermTypes } from "../../types/enums/ec2.enum";
import { regionsInternal } from "./internalEnums/regionsInternal";
import { instanceTypesInternal } from "./internalEnums/instanceTypesInternal";
import {
  getItemByIpAddress,
  putItem,
  updateNumberOfRequestsCount,
} from "../../helpers/dynamodb.helper";

export const ec2Resolver = {
  Regions: regionsInternal,
  InstanceTypes: instanceTypesInternal,
  Query: {
    ec2IntanceCost: async (_: any, args: any, req: any) => {
      const ipAddress = req.client._peername.address;

      const customerRecord = await getItemByIpAddress(ipAddress);
      if (!customerRecord) {
        await putItem(ipAddress);
      }
      await updateNumberOfRequestsCount(ipAddress);

      const { instanceType, region } = args.input;
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
