import express, { Express, Response, Request } from "express";
import HeartbeatControllerInstance from "./components/heartbeat/controllers/heartbeat.controller";
import theatreControllerInstance from "./components/bms/controllers/theatre.controller";

const PORT = 3000;
const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("HELLO WORLD! get your heartbeat from /heartbeat");
});

app.get("/heartbeat", HeartbeatControllerInstance.getTimeStamp);

app.get("/theatres/:theatresId/show", theatreControllerInstance.getMovieShows);
app.get(
  "/theatres/:theatresId/show/seat",
  theatreControllerInstance.getAvailableSeatsOfShow
);

app.listen(process.env.NODE_ENV || PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at PORT ${PORT}`);
});
