export default {
  name: "ValidationError",
  message: "Validation Failed",
  statusCode: 400,
  error: "Bad Request",
  details: {
    params: [
      {
        message:
          '"region" must be one of [us-gov-west-1, ap-south-1, ap-northeast-3, ap-northeast-2, ap-southeast-1, ap-southeast-2, ap-northeast-1, ca-central-1, eu-central-1, eu-west-1, eu-west-2, eu-west-3, sa-east-1, us-east-1, us-east-2, us-west-1, us-west-2]',
        path: ["region"],
        type: "any.only",
        context: {
          valids: [
            "us-gov-west-1",
            "ap-south-1",
            "ap-northeast-3",
            "ap-northeast-2",
            "ap-southeast-1",
            "ap-southeast-2",
            "ap-northeast-1",
            "ca-central-1",
            "eu-central-1",
            "eu-west-1",
            "eu-west-2",
            "eu-west-3",
            "sa-east-1",
            "us-east-1",
            "us-east-2",
            "us-west-1",
            "us-west-2",
          ],
          label: "region",
          value: "incorrect",
          key: "region",
        },
      },
    ],
  },
};
