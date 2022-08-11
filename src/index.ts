import express, { Express, Response, Request, NextFunction } from "express";
import bodyParser from "body-parser";
import { movieRouter } from "./routes/movie.route";
import cors from "cors";
import * as error from "./middleware/error.middleware";
import * as dotenv from "dotenv";
import { authRouter } from "./routes/auth.route";
import { heartbeatController } from "./controllers/heartbeat.controller";

const app: Express = express();

dotenv.config();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.use(cors({ origin: process.env.WHITELIST_URLS }));

app.get("/", (req: Request, res: Response) => {
  res.send("HELLO WORLD! get your heartbeat from /heartbeat");
});

app.use("/auth", authRouter);

app.use("/movie", movieRouter);
app.get("/heartbeat", heartbeatController.getTimeStamp);

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
