const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
});

export const putItem = async (ipAddress: string) => {
  try {
    const putItem = await dynamoDB
      .put({
        Item: {
          ipAddress,
          accessDenied: false,
          numberOfRequests: 0,
        },
        TableName: process.env.TABLE_NAME,
      })
      .promise();
    console.log("put", putItem);
  } catch (error) {
    console.log("put error", error);
  }
};

export const putItemWithCustomerData = async (
  ipAddress: string,
  email: string,
  customerId: string,
  subscriptionId: string
) => {
  try {
    const putItem = await dynamoDB
      .put({
        Item: {
          ipAddress,
          email: email,
          accessDenied: false,
          numberOfRequests: 0,
          customerId,
          subscriptionId,
        },
        TableName: process.env.TABLE_NAME,
      })
      .promise();
    console.log("put", putItem);
  } catch (error) {
    console.log("put error", error);
  }
};

export const updateItem = async (
  ipAddress: string,
  email: string,
  customerId: string,
  subscriptionId: string
) => {
  try {
    const putItem = await dynamoDB
      .update({
        Key: {
          ipAddress,
        },
        TableName: process.env.TABLE_NAME,

        UpdateExpression: `set email = :email, customerId = :customerId, subscriptionId = :subscriptionId`,
        ExpressionAttributeValues: {
          ":email": email,
          ":customerId": customerId,
          ":subscriptionId": subscriptionId,
        },
      })
      .promise();
    console.log("put", putItem);
  } catch (error) {}
};

export const getItemByIpAddress = async (ipAddress: string) => {
  try {
    const getItem = await dynamoDB
      .get({
        TableName: process.env.TABLE_NAME,
        Key: {
          ipAddress,
        },
      })
      .promise();
    console.log("getItem by ip", getItem);
    return getItem;
  } catch (error) {}
};

export const getItemByEmail = async (email: string) => {
  try {
    const getItem = await dynamoDB
      .get({
        TableName: process.env.TABLE_NAME,
        Key: {
          email,
        },
      })
      .promise();
    return getItem;
    console.log("get item by email", getItem);
  } catch (error) {}
};

export const deleteItem = async (email: string) => {
  try {
    const deleteItem = await dynamoDB
      .deleteItem({
        TableName: process.env.TABLE_NAME,
        Key: {
          email,
        },
      })
      .promise();
    console.log("deleted", deleteItem);
  } catch (error) {}
};

export const updateNumberOfRequestsCount = async (ipAddress: string) => {
  try {
    const updateItem = await dynamoDB
      .updateItem({
        TableName: process.env.TABLE_NAME,
        Key: { ipAddress },
        ExpressionAttributeValues: { ":inc": { N: "1" } },
        UpdateExpression: "ADD numberOfRequests :inc",
      })
      .promise();
    console.log("update item number of request count", updateItem);
  } catch (error) {}
};
