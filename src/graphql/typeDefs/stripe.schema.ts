import { buildSchema } from "graphql";

export const stripeTypeDefs = buildSchema(`
  scalar Json

  type Query {
      getCustomerSubscription: Json!
      cancelCustomerSubscription: Json!
  }

  type Mutation { 
      createCustomerSubscription(input: CreateCustomerSubscriptionInput): String!
  }

  input CreateCustomerSubscriptionInput {
      email: String!
      cardInformation: CardInformation!
  }

  input CardInformation {
      number: String!
      exp_month: Int!
      exp_year: Int!
      cvc: Int!
  }
`);
