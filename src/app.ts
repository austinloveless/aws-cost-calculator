import express from "express";
import { graphqlHTTP } from "express-graphql";

import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";
import { helloWorldRouter } from "./rest/routes";

const app = express();

app.use("/", helloWorldRouter);

app.use(
  "/graphql",
  graphqlHTTP({ schema: typeDefs, rootValue: resolvers, graphiql: true })
);

export default app;
