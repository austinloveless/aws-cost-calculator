const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
});

exports.handler = async function (event, context) {
  const params = {
    TableName: process.env.TABLE_NAME,
  };
  try {
    const { Items } = await dynamoDB.scan(params).promise();
    await resetNumberOfRequests(Items);
  } catch (error) {
    console.log("ERROR:", error);
  }
};

const resetNumberOfRequests = async (items) => {
  await Promise.all(
    items.map(async (item) => {
      await dynamoDB
        .update({
          TableName: process.env.TABLE_NAME,
          Key: { ipAddress: item.ipAddress },
          UpdateExpression: `set numberOfRequests = :numberOfRequests`,
          ExpressionAttributeValues: {
            ":numberOfRequests": 0,
          },
        })
        .promise();
    })
  );
};
