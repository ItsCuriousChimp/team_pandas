import express, { Express, Response, Request, NextFunction } from "express";
import { heartbeatController } from "./controllers/heartbeat.controller";
import authRouter from "./routes/auth.route";
import bodyParser from "body-parser";
import * as error from "./middleware/error.middleware";
import path from "path";
import * as dotenv from "dotenv";
import { redisHelper } from "./common/helpers/redis.helper";
dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

const PORT = 3000;
const app: Express = express();

//start redis connection
(async () => {
  return await redisHelper.getConnection().connect();
})();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("HELLO WORLD! get your heartbeat from /heartbeat");
});

app.get("/heartbeat", heartbeatController.getTimeStamp);

app.use("/auth", authRouter);

app.use(error.errorHandler);

app.listen(process.env.NODE_ENV || PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at PORT ${PORT}`);
});
