import app from "./app";
import { logger } from "./logger/logger";
const port = 8080;

app.listen(port, () => {
  logger.info(`server started at http://localhost:${port}`);
});
