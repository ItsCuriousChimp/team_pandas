import express, { Express, Response, Request, NextFunction } from "express";
import { heartbeatController } from "./controllers/heartbeat.controller";
import { movieRouter } from "./routes/movie.route";
import bodyParser from "body-parser";
import * as error from "./middleware/city.middleware";

const PORT = 3000;
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
  console.log(err.message);
  next(err);
});

app.use(error.cityQueryError);

app.listen(process.env.NODE_ENV || PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at PORT ${PORT}`);
});
