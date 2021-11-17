import { TermTypes } from "../../types/enums/ec2.enum";
import { pricingGetProducts } from "../../helpers/pricing.helper";
import { ServiceCodes } from "../../types/enums/serviceCodes.enum";
import { baseError } from "../../errors/base-error.error";

export const getLambdaCost = async (
  req: any,
  res: any
): Promise<Express.Response> => {
  const { usageType } = req.params;
  const response: any = await pricingGetProducts(
    ServiceCodes.AWSLambda,
    TermTypes.OnDemand,
    usageType
  );
  if (response instanceof Error) {
    baseError(response, res);
  }
  return res.json(response.PriceList);
};
