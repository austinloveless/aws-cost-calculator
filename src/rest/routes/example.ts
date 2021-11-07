import express from "express";
export const helloWorldRouter = express.Router();

import { exampleHandler } from "../handlers";

helloWorldRouter.get("/", (req, res) => {
  const example = exampleHandler();

  res.json(example);
});
