import { buildSchema } from "graphql";

export const lambdaTypeDefs = buildSchema(`
  scalar Json

  type Query {
    lambdaCost(usageType: String!): Json!
  }
`);
