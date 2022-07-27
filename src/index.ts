import express, { Express, Response, Request, NextFunction } from "express";
import { heartbeatController } from "./controllers/heartbeat.controller";
import authRouter from "./routes/auth.route";
import bodyParser from "body-parser";
// import {redisconfig as redisClient} from "./common/helpers/init_redis";
import * as error from "./middleware/error.middleware2";

const PORT = 3000;
const app: Express = express();

// (async () => {
//   await redisClient().connect();
//   return redisClient;
// })();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("HELLO WORLD! get your heartbeat from /heartbeat");
});

app.get("/heartbeat", heartbeatController.getTimeStamp);

app.use("/auth", authRouter);

// app.use("/updateUser")

app.use(error.errorHandler);

app.listen(process.env.NODE_ENV || PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at PORT ${PORT}`);
});
