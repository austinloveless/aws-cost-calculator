import { logger } from "../logger/logger";
import * as envVar from "env-var";
import AWS from "aws-sdk";

const region = envVar.get("AWS_REGION").required().asString();
const tableName = envVar.get("TABLE_NAME").required().asString();

const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region,
});

export const putItem = async (
  ipAddress: string,
  email?: string,
  customerId?: string,
  subscriptionId?: string
): Promise<any> => {
  try {
    await dynamoDB
      .put({
        Item: {
          ipAddress,
          numberOfRequests: 0,
          email,
          customerId,
          subscriptionId,
        },
        TableName: tableName,
      })
      .promise();
    logger.info(`Successfully put Item: ${ipAddress}`);
    return;
  } catch (error) {
    logger.error(`Error putting item: ${ipAddress}`);
    return error;
  }
};

export const getItemByIpAddress = async (ipAddress: string): Promise<any> => {
  try {
    const getItem = await dynamoDB
      .get({
        TableName: tableName,
        Key: {
          ipAddress: ipAddress,
        },
      })
      .promise();
    logger.info(`Successfully got Item By IpAddress: ${ipAddress}`);
    return getItem.Item;
  } catch (error) {
    logger.error(`Error returning Item By IpAddress: ${ipAddress}, ${error}`);
    return error;
  }
};

export const updateNumberOfRequestsCount = async (
  ipAddress: string
): Promise<any> => {
  try {
    await dynamoDB
      .update({
        TableName: tableName,
        Key: { ipAddress },
        UpdateExpression: "ADD numberOfRequests :val",
        ExpressionAttributeValues: {
          ":val": 1,
        },
      })
      .promise();
    logger.info(`Updated Number Of Requests Count for ${ipAddress}`);
    return;
  } catch (error) {
    logger.info(`Error Updating Number Of Requests for ${ipAddress}`);
    return error;
  }
};
