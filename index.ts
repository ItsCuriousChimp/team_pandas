import express, { Express, Response, Request } from "express";
import TheatreWithMovieControllerInstance from "./components/BMS/controllers/theatre.controller";
import HeartbeatControllerInstance from "./components/heartbeat/Controllers/heartbeat.Controller";
const PORT = 3000;
const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("HELLO WORLD! get your heartbeat from /heartbeat");
});

app.get("/heartbeat", HeartbeatControllerInstance.getTimeStamp);
app.get(
  "/getTheatreWithShowTime",
  TheatreWithMovieControllerInstance.getTheatreAndShowTimeWithMovie
);

app.listen(process.env.NODE_ENV || PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at PORT ${PORT}`);
});
