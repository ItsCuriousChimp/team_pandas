import express, { Express, Response, Request } from "express";
import HeartbeatControllerInstance from "./src/Controllers/heartbeat.Controller";
import movieDetailsRouter from "./src/routes/movieDetails.route";
import moviesCityLanguageRouter from "./src/routes/moviesCityLanguage.route";
const PORT = 3000;
const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("HELLO WORLD!");
});

app.get("/heartbeat", HeartbeatControllerInstance.getTimeStamp);
app.use("/getMoviesInCityByLanguage",moviesCityLanguageRouter);
app.use("/getMovieDetails",movieDetailsRouter);
app.listen(process.env.NODE_ENV || PORT, () => {
  console.log(`Server running at PORT ${PORT}`);
});
