import express from "express";
import { graphqlHTTP } from "express-graphql";
import dotenv from "dotenv";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { ValidationError } from "express-validation";
import bodyParser from "body-parser";
import {
  ec2TypeDefs,
  lambdaTypeDefs,
  stripeTypeDefs,
} from "./graphql/typeDefs";
import {
  lambdaResolver,
  ec2Resolver,
  stripeResolver,
} from "./graphql/resolvers";
import routes from "./rest/routes/index";
import { authorizeIpAddressByUsage } from "./middleware/authorization";

dotenv.config();
const app = express();
const jsonParser = bodyParser.json();

const schema = makeExecutableSchema({
  typeDefs: [ec2TypeDefs, lambdaTypeDefs, stripeTypeDefs],
  resolvers: [ec2Resolver, lambdaResolver, stripeResolver],
});

app.use(authorizeIpAddressByUsage);

app.use("/api", jsonParser, routes);

app.use("/graphql", graphqlHTTP({ schema: schema, graphiql: true }));

app.use((err: any, req: any, res: any) => {
  if (err instanceof ValidationError) {
    res.status(err.statusCode).json(err);
  } else {
    res.status(500).json({
      status: err.status,
      message: err.message,
    });
  }
});

app.use((req, res) => {
  res.status(404).json({
    message:
      "Ohh you are lost, read the API documentation to find your way back home",
  });
});

export default app;
