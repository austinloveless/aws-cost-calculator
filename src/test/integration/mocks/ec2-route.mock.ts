export const ec2PricingMock = [
  {
    product: {
      productFamily: "Compute Instance",
      attributes: {
        enhancedNetworkingSupported: "No",
        intelTurboAvailable: "Yes",
        memory: "1 GiB",
        vcpu: "1",
        classicnetworkingsupport: "false",
        capacitystatus: "UnusedCapacityReservation",
        locationType: "AWS Region",
        storage: "EBS only",
        instanceFamily: "General purpose",
        operatingSystem: "Windows",
        intelAvx2Available: "No",
        regionCode: "us-east-1",
        physicalProcessor: "Intel Xeon Family",
        clockSpeed: "Up to 3.3 GHz",
        ecu: "Variable",
        networkPerformance: "Low to Moderate",
        servicename: "Amazon Elastic Compute Cloud",
        instancesku: "AYPJKSTN4WJQRZAK",
        vpcnetworkingsupport: "true",
        instanceType: "t2.micro",
        tenancy: "Shared",
        usagetype: "UnusedBox:t2.micro",
        normalizationSizeFactor: "0.5",
        intelAvxAvailable: "Yes",
        processorFeatures: "Intel AVX; Intel Turbo",
        servicecode: "AmazonEC2",
        licenseModel: "No License required",
        currentGeneration: "Yes",
        preInstalledSw: "NA",
        location: "US East (N. Virginia)",
        processorArchitecture: "32-bit or 64-bit",
        marketoption: "OnDemand",
        operation: "RunInstances:0002",
        availabilityzone: "NA",
      },
      sku: "232BPQPAG7FV2KTN",
    },
    serviceCode: "AmazonEC2",
    terms: {
      OnDemand: {
        "232BPQPAG7FV2KTN.JRTCKXETXF": {
          priceDimensions: {
            "232BPQPAG7FV2KTN.JRTCKXETXF.6YS6EN2CT7": {
              unit: "Hrs",
              endRange: "Inf",
              description:
                "$0.0162 per Unused Reservation Windows t2.micro Instance Hour",
              appliesTo: [],
              rateCode: "232BPQPAG7FV2KTN.JRTCKXETXF.6YS6EN2CT7",
              beginRange: "0",
              pricePerUnit: { USD: "0.0162000000" },
            },
          },
          sku: "232BPQPAG7FV2KTN",
          effectiveDate: "2021-11-01T00:00:00Z",
          offerTermCode: "JRTCKXETXF",
          termAttributes: {},
        },
      },
    },
    version: "20211112193827",
    publicationDate: "2021-11-12T19:38:27Z",
  },
];

export const ec2ValidationMock = {
  name: "ValidationError",
  message: "Validation Failed",
  statusCode: 400,
  error: "Bad Request",
  details: {
    params: [
      {
        message:
          '"instanceType" must be one of [c6i.4xlarge, c6i.8xlarge, c6i.large, c6i.xlarge, c6i, cc2.8xlarge, cr1.8xlarge, d2.2xlarge, d2.4xlarge, d2.8xlarge, d2.xlarge, d2, d3.2xlarge, d3.4xlarge, d3.8xlarge, d3.xlarge, d3en.12xlarge, d3en.2xlarge, d3en.4xlarge, d3en.6xlarge, d3en.8xlarge, d3en.xlarge, dl1.24xlarge, dl1, f1.16xlarge, f1.2xlarge, f1.4xlarge, f1, g2.2xlarge, g2.8xlarge, g2, g3.16xlarge, g3.4xlarge, g3.8xlarge, g3, g3s.xlarge, g4ad.16xlarge, g4ad.2xlarge, g4ad.4xlarge, g4ad.8xlarge, g4ad.xlarge, g4ad, g4dn.12xlarge, g4dn.16xlarge, g4dn.2xlarge, g4dn.4xlarge, g4dn.8xlarge, g4dn.metal, g4dn.xlarge, g4dn, h1.16xlarge, h1.2xlarge, h1.4xlarge, h1.8xlarge, h1, hs1.8xlarge, i2.2xlarge, i2.4xlarge, i2.8xlarge, i2.large, i2.xlarge, i2, i3.16xlarge, i3.2xlarge, i3.4xlarge, i3.8xlarge, i3.large, i3.metal, i3.xlarge, i3, i3en.12xlarge, i3en.24xlarge, i3en.2xlarge, i3en.3xlarge, i3en.6xlarge, i3en.large, i3en.metal, i3en.xlarge, i3en, i3p.16xlarge, inf1.24xlarge, inf1.2xlarge, inf1.6xlarge, inf1.xlarge, inf1, m1.large, m1.medium, m1.small, m1.xlarge, m2.2xlarge, m2.4xlarge, m2.xlarge, m3.2xlarge, m3.large, m3.medium, m3.xlarge, m3, m4.10xlarge, m4.16xlarge, m4.2xlarge, a1.2xlarge, a1.4xlarge, a1.large, a1.medium, a1.metal, a1.xlarge, a1, c1.medium, c1.xlarge, c3.2xlarge, c3.4xlarge, c3.8xlarge, c3.large, c3.xlarge, c3, c4.2xlarge, c4.4xlarge, c4.8xlarge, c4.large, c4.xlarge, c4, c5.12xlarge, c5.18xlarge, c5.24xlarge, c5.2xlarge, c5.4xlarge, c5.9xlarge, c5.large, c5.metal, c5.xlarge, c5, c5a.12xlarge, c5a.16xlarge, c5a.24xlarge, c5a.2xlarge, c5a.4xlarge, c5a.8xlarge, c5a.large, c5a.xlarge, c5ad.12xlarge, c5ad.16xlarge, c5ad.24xlarge, c5ad.2xlarge, c5ad.4xlarge, c5ad.8xlarge, c5ad.large, c5ad.xlarge, c5d.12xlarge, c5d.18xlarge, c5d.24xlarge, c5d.2xlarge, c5d.4xlarge, c5d.9xlarge, c5d.large, c5d.metal, c5d.xlarge, c5d, c5n.18xlarge, c5n.2xlarge, c5n.4xlarge, c5n.9xlarge, c5n.large, c5n.metal, c5n.xlarge, c5n, c6g.12xlarge, c6g.16xlarge, c6g.2xlarge, c6g.4xlarge, c6g.8xlarge, c6g.large, c6g.medium, c6g.metal, c6g.xlarge, c6g, c6gd.12xlarge, c6gd.16xlarge, c6gd.2xlarge, c6gd.4xlarge, c6gd.8xlarge, c6gd.large, c6gd.medium, c6gd.metal, c6gd.xlarge, c6gd, c6gn.12xlarge, c6gn.16xlarge, c6gn.2xlarge, c6gn.4xlarge, c6gn.8xlarge, c6gn.large, c6gn.medium, c6gn.metal, c6gn.xlarge, c6gn, c6i.12xlarge, c6i.16xlarge, c6i.24xlarge, c6i.2xlarge, c6i.32xlarge, m4.4xlarge, m4.large, m4.xlarge, m4, m5.12xlarge, m5.16xlarge, m5.24xlarge, m5.2xlarge, m5.4xlarge, m5.8xlarge, m5.large, m5.metal, m5.xlarge, m5, m5a.12xlarge, m5a.16xlarge, m5a.24xlarge, m5a.2xlarge, m5a.4xlarge, m5a.8xlarge, m5a.large, m5a.xlarge, m5ad.12xlarge, m5ad.16xlarge, m5ad.24xlarge, m5ad.2xlarge, m5ad.4xlarge, m5ad.8xlarge, m5ad.large, m5ad.xlarge, m5d.12xlarge, m5d.16xlarge, m5d.24xlarge, m5d.2xlarge, m5d.4xlarge, m5d.8xlarge, m5d.large, m5d.metal, m5d.xlarge, m5d, m5dn.12xlarge, m5dn.16xlarge, m5dn.24xlarge, m5dn.2xlarge, m5dn.4xlarge, m5dn.8xlarge, m5dn.large, m5dn.metal, m5dn.xlarge, m5dn, m5n.12xlarge, m5n.16xlarge, m5n.24xlarge, m5n.2xlarge, m5n.4xlarge, m5n.8xlarge, m5n.large, m5n.metal, m5n.xlarge, m5n, m5zn.12xlarge, m5zn.2xlarge, m5zn.3xlarge, m5zn.6xlarge, m5zn.large, m5zn.metal, m5zn.xlarge, m5zn, m6g.12xlarge, m6g.16xlarge, m6g.2xlarge, m6g.4xlarge, m6g.8xlarge, m6g.large, m6g.medium, m6g.metal, m6g.xlarge, m6g, m6gd.12xlarge, m6gd.16xlarge, m6gd.2xlarge, m6gd.4xlarge, m6gd.8xlarge, m6gd.large, m6gd.medium, m6gd.metal, m6gd.xlarge, m6gd, m6i.12xlarge, m6i.16xlarge, m6i.24xlarge, m6i.2xlarge, m6i.32xlarge, m6i.4xlarge, m6i.8xlarge, m6i.large, m6i.xlarge, m6i, mac1.metal, mac1, p2.16xlarge, p2.8xlarge, p2.xlarge, p2, p3.16xlarge, p3.2xlarge, p3.8xlarge, p3, p3dn.24xlarge, p3dn, p4d.24xlarge, p4d, r3.2xlarge, r3.4xlarge, r3.8xlarge, r3.large, r3.xlarge, r3, r4.16xlarge, r4.2xlarge, r4.4xlarge, r4.8xlarge, r4.large, r4.xlarge, r4, r5.12xlarge, r5.16xlarge, r5.24xlarge, r5.2xlarge, r5.4xlarge, r5.8xlarge, r5.large, r5.metal, r5.xlarge, r5, r5a.12xlarge, r5a.16xlarge, r5a.24xlarge, r5a.2xlarge, r5a.4xlarge, r5a.8xlarge, r5a.large, r5a.xlarge, r5ad.12xlarge, r5ad.16xlarge, r5ad.24xlarge, r5ad.2xlarge, r5ad.4xlarge, r5ad.8xlarge, r5ad.large, r5ad.xlarge, r5b.12xlarge, r5b.16xlarge, r5b.24xlarge, r5b.2xlarge, r5b.4xlarge, r5b.8xlarge, r5b.large, r5b.metal, r5b.xlarge, r5b, r5d.12xlarge, r5d.16xlarge, r5d.24xlarge, r5d.2xlarge, r5d.4xlarge, r5d.8xlarge, r5d.large, r5d.metal, r5d.xlarge, r5d, r5dn.12xlarge, r5dn.16xlarge, r5dn.24xlarge, r5dn.2xlarge, r5dn.4xlarge, r5dn.8xlarge, r5dn.large, r5dn.metal, r5dn.xlarge, r5dn, r5n.12xlarge, r5n.16xlarge, r5n.24xlarge, r5n.2xlarge, r5n.4xlarge, r5n.8xlarge, r5n.large, r5n.metal, r5n.xlarge, r5n, r6g.12xlarge, r6g.16xlarge, r6g.2xlarge, r6g.4xlarge, r6g.8xlarge, r6g.large, r6g.medium, r6g.metal, r6g.xlarge, r6g, r6gd.12xlarge, r6gd.16xlarge, r6gd.2xlarge, r6gd.4xlarge, r6gd.8xlarge, r6gd.large, r6gd.medium, r6gd.metal, r6gd.xlarge, r6gd, t1.micro, t2.2xlarge, t2.large, t2.medium, t2.micro, t2.nano, t2.small, t2.xlarge, t3.2xlarge, t3.large, t3.medium, t3.micro, t3.nano, t3.small, t3.xlarge, t3, t3a.2xlarge, t3a.large, t3a.medium, t3a.micro, t3a.nano, t3a.small, t3a.xlarge, t4g.2xlarge, t4g.large, t4g.medium, t4g.micro, t4g.nano, t4g.small, t4g.xlarge, u-12tb1.112xlarge, u-12tb1.metal, u-12tb1, u-18tb1.metal, u-18tb1, u-24tb1.metal, u-24tb1, u-6tb1.112xlarge, u-6tb1.56xlarge, u-6tb1.metal, u-6tb1, u-9tb1.112xlarge, u-9tb1.metal, u-9tb1, vt1.24xlarge, vt1.3xlarge, vt1.6xlarge, vt1, x1.16xlarge, x1.32xlarge, x1, x1e.16xlarge, x1e.2xlarge, x1e.32xlarge, x1e.4xlarge, x1e.8xlarge, x1e.xlarge, x1e, x2gd.12xlarge, x2gd.16xlarge, x2gd.2xlarge, x2gd.4xlarge, x2gd.8xlarge, x2gd.large, x2gd.medium, x2gd.metal, x2gd.xlarge, x2gd, z1d.12xlarge, z1d.2xlarge, z1d.3xlarge, z1d.6xlarge, z1d.large, z1d.metal, z1d.xlarge, z1d]',
        path: ["instanceType"],
        type: "any.only",
        context: {
          valids: [
            "c6i.4xlarge",
            "c6i.8xlarge",
            "c6i.large",
            "c6i.xlarge",
            "c6i",
            "cc2.8xlarge",
            "cr1.8xlarge",
            "d2.2xlarge",
            "d2.4xlarge",
            "d2.8xlarge",
            "d2.xlarge",
            "d2",
            "d3.2xlarge",
            "d3.4xlarge",
            "d3.8xlarge",
            "d3.xlarge",
            "d3en.12xlarge",
            "d3en.2xlarge",
            "d3en.4xlarge",
            "d3en.6xlarge",
            "d3en.8xlarge",
            "d3en.xlarge",
            "dl1.24xlarge",
            "dl1",
            "f1.16xlarge",
            "f1.2xlarge",
            "f1.4xlarge",
            "f1",
            "g2.2xlarge",
            "g2.8xlarge",
            "g2",
            "g3.16xlarge",
            "g3.4xlarge",
            "g3.8xlarge",
            "g3",
            "g3s.xlarge",
            "g4ad.16xlarge",
            "g4ad.2xlarge",
            "g4ad.4xlarge",
            "g4ad.8xlarge",
            "g4ad.xlarge",
            "g4ad",
            "g4dn.12xlarge",
            "g4dn.16xlarge",
            "g4dn.2xlarge",
            "g4dn.4xlarge",
            "g4dn.8xlarge",
            "g4dn.metal",
            "g4dn.xlarge",
            "g4dn",
            "h1.16xlarge",
            "h1.2xlarge",
            "h1.4xlarge",
            "h1.8xlarge",
            "h1",
            "hs1.8xlarge",
            "i2.2xlarge",
            "i2.4xlarge",
            "i2.8xlarge",
            "i2.large",
            "i2.xlarge",
            "i2",
            "i3.16xlarge",
            "i3.2xlarge",
            "i3.4xlarge",
            "i3.8xlarge",
            "i3.large",
            "i3.metal",
            "i3.xlarge",
            "i3",
            "i3en.12xlarge",
            "i3en.24xlarge",
            "i3en.2xlarge",
            "i3en.3xlarge",
            "i3en.6xlarge",
            "i3en.large",
            "i3en.metal",
            "i3en.xlarge",
            "i3en",
            "i3p.16xlarge",
            "inf1.24xlarge",
            "inf1.2xlarge",
            "inf1.6xlarge",
            "inf1.xlarge",
            "inf1",
            "m1.large",
            "m1.medium",
            "m1.small",
            "m1.xlarge",
            "m2.2xlarge",
            "m2.4xlarge",
            "m2.xlarge",
            "m3.2xlarge",
            "m3.large",
            "m3.medium",
            "m3.xlarge",
            "m3",
            "m4.10xlarge",
            "m4.16xlarge",
            "m4.2xlarge",
            "a1.2xlarge",
            "a1.4xlarge",
            "a1.large",
            "a1.medium",
            "a1.metal",
            "a1.xlarge",
            "a1",
            "c1.medium",
            "c1.xlarge",
            "c3.2xlarge",
            "c3.4xlarge",
            "c3.8xlarge",
            "c3.large",
            "c3.xlarge",
            "c3",
            "c4.2xlarge",
            "c4.4xlarge",
            "c4.8xlarge",
            "c4.large",
            "c4.xlarge",
            "c4",
            "c5.12xlarge",
            "c5.18xlarge",
            "c5.24xlarge",
            "c5.2xlarge",
            "c5.4xlarge",
            "c5.9xlarge",
            "c5.large",
            "c5.metal",
            "c5.xlarge",
            "c5",
            "c5a.12xlarge",
            "c5a.16xlarge",
            "c5a.24xlarge",
            "c5a.2xlarge",
            "c5a.4xlarge",
            "c5a.8xlarge",
            "c5a.large",
            "c5a.xlarge",
            "c5ad.12xlarge",
            "c5ad.16xlarge",
            "c5ad.24xlarge",
            "c5ad.2xlarge",
            "c5ad.4xlarge",
            "c5ad.8xlarge",
            "c5ad.large",
            "c5ad.xlarge",
            "c5d.12xlarge",
            "c5d.18xlarge",
            "c5d.24xlarge",
            "c5d.2xlarge",
            "c5d.4xlarge",
            "c5d.9xlarge",
            "c5d.large",
            "c5d.metal",
            "c5d.xlarge",
            "c5d",
            "c5n.18xlarge",
            "c5n.2xlarge",
            "c5n.4xlarge",
            "c5n.9xlarge",
            "c5n.large",
            "c5n.metal",
            "c5n.xlarge",
            "c5n",
            "c6g.12xlarge",
            "c6g.16xlarge",
            "c6g.2xlarge",
            "c6g.4xlarge",
            "c6g.8xlarge",
            "c6g.large",
            "c6g.medium",
            "c6g.metal",
            "c6g.xlarge",
            "c6g",
            "c6gd.12xlarge",
            "c6gd.16xlarge",
            "c6gd.2xlarge",
            "c6gd.4xlarge",
            "c6gd.8xlarge",
            "c6gd.large",
            "c6gd.medium",
            "c6gd.metal",
            "c6gd.xlarge",
            "c6gd",
            "c6gn.12xlarge",
            "c6gn.16xlarge",
            "c6gn.2xlarge",
            "c6gn.4xlarge",
            "c6gn.8xlarge",
            "c6gn.large",
            "c6gn.medium",
            "c6gn.metal",
            "c6gn.xlarge",
            "c6gn",
            "c6i.12xlarge",
            "c6i.16xlarge",
            "c6i.24xlarge",
            "c6i.2xlarge",
            "c6i.32xlarge",
            "m4.4xlarge",
            "m4.large",
            "m4.xlarge",
            "m4",
            "m5.12xlarge",
            "m5.16xlarge",
            "m5.24xlarge",
            "m5.2xlarge",
            "m5.4xlarge",
            "m5.8xlarge",
            "m5.large",
            "m5.metal",
            "m5.xlarge",
            "m5",
            "m5a.12xlarge",
            "m5a.16xlarge",
            "m5a.24xlarge",
            "m5a.2xlarge",
            "m5a.4xlarge",
            "m5a.8xlarge",
            "m5a.large",
            "m5a.xlarge",
            "m5ad.12xlarge",
            "m5ad.16xlarge",
            "m5ad.24xlarge",
            "m5ad.2xlarge",
            "m5ad.4xlarge",
            "m5ad.8xlarge",
            "m5ad.large",
            "m5ad.xlarge",
            "m5d.12xlarge",
            "m5d.16xlarge",
            "m5d.24xlarge",
            "m5d.2xlarge",
            "m5d.4xlarge",
            "m5d.8xlarge",
            "m5d.large",
            "m5d.metal",
            "m5d.xlarge",
            "m5d",
            "m5dn.12xlarge",
            "m5dn.16xlarge",
            "m5dn.24xlarge",
            "m5dn.2xlarge",
            "m5dn.4xlarge",
            "m5dn.8xlarge",
            "m5dn.large",
            "m5dn.metal",
            "m5dn.xlarge",
            "m5dn",
            "m5n.12xlarge",
            "m5n.16xlarge",
            "m5n.24xlarge",
            "m5n.2xlarge",
            "m5n.4xlarge",
            "m5n.8xlarge",
            "m5n.large",
            "m5n.metal",
            "m5n.xlarge",
            "m5n",
            "m5zn.12xlarge",
            "m5zn.2xlarge",
            "m5zn.3xlarge",
            "m5zn.6xlarge",
            "m5zn.large",
            "m5zn.metal",
            "m5zn.xlarge",
            "m5zn",
            "m6g.12xlarge",
            "m6g.16xlarge",
            "m6g.2xlarge",
            "m6g.4xlarge",
            "m6g.8xlarge",
            "m6g.large",
            "m6g.medium",
            "m6g.metal",
            "m6g.xlarge",
            "m6g",
            "m6gd.12xlarge",
            "m6gd.16xlarge",
            "m6gd.2xlarge",
            "m6gd.4xlarge",
            "m6gd.8xlarge",
            "m6gd.large",
            "m6gd.medium",
            "m6gd.metal",
            "m6gd.xlarge",
            "m6gd",
            "m6i.12xlarge",
            "m6i.16xlarge",
            "m6i.24xlarge",
            "m6i.2xlarge",
            "m6i.32xlarge",
            "m6i.4xlarge",
            "m6i.8xlarge",
            "m6i.large",
            "m6i.xlarge",
            "m6i",
            "mac1.metal",
            "mac1",
            "p2.16xlarge",
            "p2.8xlarge",
            "p2.xlarge",
            "p2",
            "p3.16xlarge",
            "p3.2xlarge",
            "p3.8xlarge",
            "p3",
            "p3dn.24xlarge",
            "p3dn",
            "p4d.24xlarge",
            "p4d",
            "r3.2xlarge",
            "r3.4xlarge",
            "r3.8xlarge",
            "r3.large",
            "r3.xlarge",
            "r3",
            "r4.16xlarge",
            "r4.2xlarge",
            "r4.4xlarge",
            "r4.8xlarge",
            "r4.large",
            "r4.xlarge",
            "r4",
            "r5.12xlarge",
            "r5.16xlarge",
            "r5.24xlarge",
            "r5.2xlarge",
            "r5.4xlarge",
            "r5.8xlarge",
            "r5.large",
            "r5.metal",
            "r5.xlarge",
            "r5",
            "r5a.12xlarge",
            "r5a.16xlarge",
            "r5a.24xlarge",
            "r5a.2xlarge",
            "r5a.4xlarge",
            "r5a.8xlarge",
            "r5a.large",
            "r5a.xlarge",
            "r5ad.12xlarge",
            "r5ad.16xlarge",
            "r5ad.24xlarge",
            "r5ad.2xlarge",
            "r5ad.4xlarge",
            "r5ad.8xlarge",
            "r5ad.large",
            "r5ad.xlarge",
            "r5b.12xlarge",
            "r5b.16xlarge",
            "r5b.24xlarge",
            "r5b.2xlarge",
            "r5b.4xlarge",
            "r5b.8xlarge",
            "r5b.large",
            "r5b.metal",
            "r5b.xlarge",
            "r5b",
            "r5d.12xlarge",
            "r5d.16xlarge",
            "r5d.24xlarge",
            "r5d.2xlarge",
            "r5d.4xlarge",
            "r5d.8xlarge",
            "r5d.large",
            "r5d.metal",
            "r5d.xlarge",
            "r5d",
            "r5dn.12xlarge",
            "r5dn.16xlarge",
            "r5dn.24xlarge",
            "r5dn.2xlarge",
            "r5dn.4xlarge",
            "r5dn.8xlarge",
            "r5dn.large",
            "r5dn.metal",
            "r5dn.xlarge",
            "r5dn",
            "r5n.12xlarge",
            "r5n.16xlarge",
            "r5n.24xlarge",
            "r5n.2xlarge",
            "r5n.4xlarge",
            "r5n.8xlarge",
            "r5n.large",
            "r5n.metal",
            "r5n.xlarge",
            "r5n",
            "r6g.12xlarge",
            "r6g.16xlarge",
            "r6g.2xlarge",
            "r6g.4xlarge",
            "r6g.8xlarge",
            "r6g.large",
            "r6g.medium",
            "r6g.metal",
            "r6g.xlarge",
            "r6g",
            "r6gd.12xlarge",
            "r6gd.16xlarge",
            "r6gd.2xlarge",
            "r6gd.4xlarge",
            "r6gd.8xlarge",
            "r6gd.large",
            "r6gd.medium",
            "r6gd.metal",
            "r6gd.xlarge",
            "r6gd",
            "t1.micro",
            "t2.2xlarge",
            "t2.large",
            "t2.medium",
            "t2.micro",
            "t2.nano",
            "t2.small",
            "t2.xlarge",
            "t3.2xlarge",
            "t3.large",
            "t3.medium",
            "t3.micro",
            "t3.nano",
            "t3.small",
            "t3.xlarge",
            "t3",
            "t3a.2xlarge",
            "t3a.large",
            "t3a.medium",
            "t3a.micro",
            "t3a.nano",
            "t3a.small",
            "t3a.xlarge",
            "t4g.2xlarge",
            "t4g.large",
            "t4g.medium",
            "t4g.micro",
            "t4g.nano",
            "t4g.small",
            "t4g.xlarge",
            "u-12tb1.112xlarge",
            "u-12tb1.metal",
            "u-12tb1",
            "u-18tb1.metal",
            "u-18tb1",
            "u-24tb1.metal",
            "u-24tb1",
            "u-6tb1.112xlarge",
            "u-6tb1.56xlarge",
            "u-6tb1.metal",
            "u-6tb1",
            "u-9tb1.112xlarge",
            "u-9tb1.metal",
            "u-9tb1",
            "vt1.24xlarge",
            "vt1.3xlarge",
            "vt1.6xlarge",
            "vt1",
            "x1.16xlarge",
            "x1.32xlarge",
            "x1",
            "x1e.16xlarge",
            "x1e.2xlarge",
            "x1e.32xlarge",
            "x1e.4xlarge",
            "x1e.8xlarge",
            "x1e.xlarge",
            "x1e",
            "x2gd.12xlarge",
            "x2gd.16xlarge",
            "x2gd.2xlarge",
            "x2gd.4xlarge",
            "x2gd.8xlarge",
            "x2gd.large",
            "x2gd.medium",
            "x2gd.metal",
            "x2gd.xlarge",
            "x2gd",
            "z1d.12xlarge",
            "z1d.2xlarge",
            "z1d.3xlarge",
            "z1d.6xlarge",
            "z1d.large",
            "z1d.metal",
            "z1d.xlarge",
            "z1d",
          ],
          label: "instanceType",
          value: "incorrect",
          key: "instanceType",
        },
      },
    ],
  },
};
