const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
});

exports.handler = async function (event, context) {
  const params = {
    TableName: process.env.TABLE_NAME,
  };
  try {
    const result = await dynamoDB.scan(params).promise();
    console.log("result", result);
  } catch (e) {
    console.log("error", e);
  }
};
