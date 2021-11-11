import { Regions } from "../types/enums/regions.enum";

const locationToRegionMap = {
  "us-gov-west-1": "AWS GovCloud (US)",
  "ap-south-1": "Asia Pacific (Mumbai)",
  "ap-northeast-3": "Asia Pacific (Osaka-Local)",
  "ap-northeast-2": "Asia Pacific (Seoul)",
  "ap-southeast-1": "Asia Pacific (Singapore)",
  "ap-southeast-2": "Asia Pacific (Sydney)",
  "ap-northeast-1": "Asia Pacific (Tokyo)",
  "ca-central-1": "Canada (Central)",
  "eu-central-1": "EU (Frankfurt)",
  "eu-west-1": "EU (Ireland)",
  "eu-west-2": "EU (London)",
  "eu-west-3": "EU (Paris)",
  "sa-east-1": "South America (Sao Paulo)",
  "us-east-1": "US East (N. Virginia)",
  "us-east-2": "US East (Ohio)",
  "us-west-1": "US West (N. California)",
  "us-west-2": "US West (Oregon)",
};

export const locationToRegion = (region?: Regions): string => {
  let response = "";
  for (const location in locationToRegionMap) {
    if (!region) {
      response = locationToRegionMap["us-east-1"];
    }
    if (region === location) {
      response = locationToRegionMap[location];
    }
  }
  return response;
};