import AWS from "aws-sdk";
const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
});

exports.handler = async function () {
  const params = {
    TableName: process.env.TABLE_NAME,
  };
  try {
    const { Items } = await dynamoDB.scan(params).promise();

    await resetNumberOfRequests(Items);
    console.log("Successfully reset number of requests for all users.");
    return;
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
          // eslint-disable-next-line quotes
          UpdateExpression: `set numberOfRequests = :numberOfRequests`,
          ExpressionAttributeValues: {
            ":numberOfRequests": 0,
          },
        })
        .promise();
    })
  );
};
