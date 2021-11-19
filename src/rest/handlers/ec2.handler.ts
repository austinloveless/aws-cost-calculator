import { TermTypes } from "../../types/enums/ec2.enum";
import { pricingGetProducts } from "../../helpers/pricing.helper";
import { ServiceCodes } from "../../types/enums/serviceCodes.enum";
import { baseError } from "../../errors/base-error.error";
import {
  getItemByIpAddress,
  putItem,
  updateNumberOfRequestsCount,
} from "../../helpers/dynamodb.helper";

export const getEc2InstanceCost = async (
  req: any,
  res: any
): Promise<Express.Response> => {
  const { instanceType, region } = req.params;
  const ipAddress = req.socket.remoteAddress;
  const customerRecord = await getItemByIpAddress(ipAddress);
  if (!Object.keys(customerRecord).length) {
    await putItem(ipAddress);
  }
  await updateNumberOfRequestsCount(ipAddress);
  const response: any = await pricingGetProducts(
    ServiceCodes.AmazonEC2,
    TermTypes.OnDemand,
    instanceType,
    region
  );
  if (response instanceof Error) {
    baseError(response, res);
  }
  return res.json(response.PriceList);
};
