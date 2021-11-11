import { TermTypes } from "../../types/enums/ec2";
import { pricingGetProducts } from "../../helpers/pricing";
import { ServiceCodes } from "../../types/enums/serviceCodes";
import { baseError } from "../../errors/base-error";

export const getEc2InstanceCost = async (
  req: any,
  res: any
): Promise<Express.Response> => {
  const { instanceType, region } = req.params;
  const response = await pricingGetProducts(
    ServiceCodes.AmazonEC2,
    TermTypes.OnDemand,
    instanceType,
    region
  );
  if (response instanceof Error) {
    baseError(response, res);
  }
  return res.json(response);
};
