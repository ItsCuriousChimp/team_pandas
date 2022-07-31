import express, { Express, Response, Request, NextFunction } from "express";
import bodyParser from "body-parser";
import { movieRouter } from "./routes/movie.router";
import * as error from "./middleware/error.middleware";
import { heartbeatController } from "./controllers/heartbeat.controller";
import { PORT } from "./common/constants";

const app: Express = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("HELLO WORLD!");
});

app.get("/heartbeat", heartbeatController.getTimeStamp);

app.use("/movie", movieRouter);

// Error handler middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  next(err);
});

app.use(error.handler);

// Handle 404 error
app.use(error.resourceNotFoundHandler);

app.listen(PORT, () => {
  console.log(`Server running at PORT ${PORT}`);
});
