import { logger } from "../logger/logger";

const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
});

export const putItem = async (
  ipAddress: string,
  email?: string,
  customerId?: string,
  subscriptionId?: string
) => {
  try {
    await dynamoDB
      .put({
        Item: {
          ipAddress,
          accessDenied: false,
          numberOfRequests: 0,
          email,
          customerId,
          subscriptionId,
        },
        TableName: process.env.TABLE_NAME,
      })
      .promise();
    logger.info(`Successfully put Item: ${ipAddress}`);
  } catch (error) {
    logger.error(`Error putting item: ${ipAddress}`);
    return error;
  }
};

export const updateItem = async (
  ipAddress: string,
  email: string,
  customerId: string,
  subscriptionId: string
) => {
  try {
    await dynamoDB
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
    logger.info(`Successfully updated Item: ${ipAddress}`);
  } catch (error) {
    logger.error(`Error updating item: ${ipAddress}`);
    return error;
  }
};

export const getItemByIpAddress = async (ipAddress: string) => {
  try {
    const getItem = await dynamoDB
      .get({
        TableName: process.env.TABLE_NAME,
        Key: {
          ipAddress: ipAddress,
        },
      })
      .promise();
    logger.info(`Successfully got Item By IpAddress: ${ipAddress}`);
    return getItem;
  } catch (error) {
    logger.error(`Error returning Item By IpAddress: ${ipAddress}`);
    return error;
  }
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
    logger.info(`Successfully got Item By Email: ${email}`);
    return getItem;
  } catch (error) {
    logger.error(`Error returning Item By Email: ${email}`);
    return error;
  }
};

export const updateNumberOfRequestsCount = async (ipAddress: string) => {
  try {
    await dynamoDB
      .update({
        TableName: process.env.TABLE_NAME,
        Key: { ipAddress },
        UpdateExpression: "ADD numberOfRequests :val",
        ExpressionAttributeValues: {
          ":val": 1,
        },
      })
      .promise();
    logger.info(`Updated Number Of Requests Count for ${ipAddress}`);
  } catch (error) {
    logger.info(`Error Updating Number Of Requests for ${ipAddress}`);
    return error;
  }
};
