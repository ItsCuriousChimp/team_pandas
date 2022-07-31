import express, { Express, Response, Request, NextFunction } from "express";
import bodyParser from "body-parser";
import { PORT } from "./common/constants";
import { movieRouter } from "./routes/movie.route";
import * as error from "./middleware/error.middleware";
import { heartbeatController } from "./controllers/heartbeat.controller";

const app: Express = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("HELLO WORLD! get your heartbeat from /heartbeat");
});

app.get("/heartbeat", heartbeatController.getTimeStamp);

app.use("/movie", movieRouter);

// Error handler middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  next(err);
});

app.use(error.handler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at PORT ${PORT}`);
});
