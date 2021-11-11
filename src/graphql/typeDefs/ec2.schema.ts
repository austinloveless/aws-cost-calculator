import { buildSchema } from "graphql";

export const ec2TypeDefs = buildSchema(`
  scalar Json

  type Query {
    ec2IntanceCost(instanceType: String!, region: String!): Json!
  }
`);
