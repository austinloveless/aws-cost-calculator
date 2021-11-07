import express from "express";
import { graphqlHTTP } from "express-graphql";

import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";
import { helloWorldRouter } from "./rest/routes";

const server = express();

server.use("/", helloWorldRouter);

server.use(
  "/graphql",
  graphqlHTTP({ schema: typeDefs, rootValue: resolvers, graphiql: true })
);

export default server;
