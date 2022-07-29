import express, { Express, Response, Request, Router } from "express";
import { redisHelper } from "./common/helpers/redis.helper";
import { heartbeatController } from "./controllers/heartbeat.controller";
import theatreRoutes from "./routes/theatre.route";
import * as error from "./middleware/error.middleware";

const PORT = 3000;
const app: Express = express();
//start redis connection
(async () => {
  return await redisHelper.getConnection().connect();
})();

app.get("/", (req: Request, res: Response) => {
  res.send("HELLO WORLD! get your heartbeat from /heartbeat");
});

app.get("/heartbeat", heartbeatController.getTimeStamp);
//theatre routes
app.use("/theatre", theatreRoutes);

app.use(error.errorHandler);

app.listen(process.env.NODE_ENV || PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at PORT ${PORT}`);
});
