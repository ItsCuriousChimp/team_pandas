import express, { Express, Response, Request, NextFunction } from "express";
import { heartbeatController } from "./controllers/heartbeat.controller";
import { loginRouter } from "./routes/login.route";
import bodyParser from "body-parser";
import * as error from "./middleware/error.middleware";
import { redisHelper } from "./common/helpers/redis.helper";

const PORT = 3000;
const app: Express = express();

(async () => {
  await redisHelper.getConnection().connect();
  return redisHelper.getConnection();
})();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("HELLO WORLD! get your heartbeat from /heartbeat");
});

app.get("/heartbeat", heartbeatController.getTimeStamp);

app.use("/login", loginRouter);

// Error handler middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  next(err);
});

app.use(error.handler);

// Handle 404 error
app.use(error.notFoundErrorHandler);

app.listen(process.env.NODE_ENV || PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at PORT ${PORT}`);
});
