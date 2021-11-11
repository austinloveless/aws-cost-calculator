import { TermTypes } from "../../types/enums/ec2";
import { pricingGetProducts } from "../../helpers/pricing";
import { ServiceCodes } from "../../types/enums/serviceCodes";
import { baseError } from "../../errors/base-error";

export const getLambdaCost = async (
  req: any,
  res: any
): Promise<Express.Response> => {
  const { usageType } = req.params;
  const response = await pricingGetProducts(
    ServiceCodes.AWSLambda,
    TermTypes.OnDemand,
    usageType
  );
  if (response instanceof Error) {
    baseError(response, res);
  }
  return res.json(response);
};
