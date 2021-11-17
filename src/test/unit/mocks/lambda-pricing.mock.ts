export default {
  FormatVersion: "aws_v1",
  PriceList: [
    {
      product: {
        productFamily: "Serverless",
        attributes: {
          regionCode: "ap-northeast-1",
          servicecode: "AWSLambda",
          groupDescription:
            "Invocation duration weighted by memory assigned to function, measured in GB-s",
          usagetype: "APN1-Lambda-Edge-GB-Second",
          locationType: "AWS Region",
          location: "Asia Pacific (Tokyo)",
          servicename: "AWS Lambda",
          operation: "",
          group: "AWS-Lambda-Edge-Duration",
        },
        sku: "JC3XFM9B7WBA85YZ",
      },
      serviceCode: "AWSLambda",
      terms: {
        OnDemand: {
          "JC3XFM9B7WBA85YZ.JRTCKXETXF": {
            priceDimensions: {
              "JC3XFM9B7WBA85YZ.JRTCKXETXF.6YS6EN2CT7": {
                unit: "Lambda-GB-Second",
                endRange: "Inf",
                description:
                  "AWS Lambda Edge - Total Compute - Asia Pacific (Tokyo)",
                appliesTo: [],
                rateCode: "JC3XFM9B7WBA85YZ.JRTCKXETXF.6YS6EN2CT7",
                beginRange: "0",
                pricePerUnit: { USD: "0.0000500100" },
              },
            },
            sku: "JC3XFM9B7WBA85YZ",
            effectiveDate: "2021-11-01T00:00:00Z",
            offerTermCode: "JRTCKXETXF",
            termAttributes: {},
          },
        },
      },
      version: "20211116085425",
      publicationDate: "2021-11-16T08:54:25Z",
    },
  ],
  NextToken:
    "RmEz4CrZRgJY48AvO2st/w==:C0d1J/iQrjs0y5otTPN9Wd4Fe/GnugGDHVfJAf/bOuxdRp6/97ztuN0bJZmS2d8iEGI6ky/+RZtIaPRYr2gOXtGqJVuLlB20bnS4/KDVNovhzV8YiEzC62vt0au/DiSRyxcGFcE/LLoKBFtI1es2Ib3aHANpa3jO2py2uxWczoFLNGmNb8hrw+r2+ssLt2pf",
};
