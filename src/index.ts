import express, { Express, Response, Request, NextFunction } from "express";
import { heartbeatController } from "./controllers/heartbeat.controller";
import { theatreRouter } from "./routes/theatre.route";
import bodyParser from "body-parser";
import * as error from "./middleware/error.middleware";

const PORT = 3000;
const app: Express = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("HELLO WORLD! get your heartbeat from /heartbeat");
});

app.get("/heartbeat", heartbeatController.getTimeStamp);

app.use("/theatre", theatreRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  next(err);
});

app.use(error.theatreValidationError);

app.listen(process.env.NODE_ENV || PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at PORT ${PORT}`);
});
