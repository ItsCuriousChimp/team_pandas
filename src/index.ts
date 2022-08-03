import express, { Express, Response, Request, NextFunction } from "express";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import * as error from "./middleware/error.middleware";
import { loginRouter } from "./routes/login.route";
import { movieRouter } from "./routes/movie.route";
import { heartbeatController } from "./controllers/heartbeat.controller";

const app: Express = express();

dotenv.config();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("HELLO WORLD!");
});

app.get("/heartbeat", heartbeatController.getTimeStamp);

app.use("/login", loginRouter);

app.use("/movie", movieRouter);

// Error handler middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  next(err);
});

app.use(error.handler);

// Handle 404 error
app.use(error.resourceNotFoundHandler);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at PORT ${process.env.PORT}`);
});
