import express from "express";
import { graphqlHTTP } from "express-graphql";
import dotenv from "dotenv";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { ValidationError } from "express-validation";
import { ec2TypeDefs, lambdaTypeDefs } from "./graphql/typeDefs";
import { lambdaResolver, ec2Resolver } from "./graphql/resolvers";
import routes from "./rest/routes/index";

dotenv.config();
const app = express();

app.get("/health-check", (req, res) =>
  res.json({
    status: "ok",
  })
);

const schema = makeExecutableSchema({
  typeDefs: [ec2TypeDefs, lambdaTypeDefs],
  resolvers: [ec2Resolver, lambdaResolver],
});

app.use("/api", routes);

app.use("/graphql", graphqlHTTP({ schema: schema, graphiql: true }));

app.use((err: any, req: any, res: any, next: any) => {
  if (err instanceof ValidationError) {
    res.status(err.statusCode).json(err);
  } else {
    res.status(500).json({
      status: err.status,
      message: err.message,
    });
  }
});

app.use((req, res, next) => {
  res.status(404).json({
    message:
      "Ohh you are lost, read the API documentation to find your way back home",
  });
});

export default app;
