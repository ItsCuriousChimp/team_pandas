import express, { Express, Response, Request } from "express";
import HeartbeatControllerInstance from "./components/heartbeat/Controllers/heartbeat.Controller";
import { movieDetailsController } from "./components/heartbeat/Controllers/movieDetails.controller";
import { moviesInCityByLanguageController } from "./components/heartbeat/Controllers/moviesCityLanguage.controller";
const PORT = 3000;
const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("HELLO WORLD!");
});

app.get("/heartbeat", HeartbeatControllerInstance.getTimeStamp);
app.get("/getMoviesInCityByLanguage",moviesInCityByLanguageController.getAllMoviesInCityByLanguage);
app.get("/getMovieDetails",movieDetailsController.getMovieDetails);
app.listen(process.env.NODE_ENV || PORT, () => {
  console.log(`Server running at PORT ${PORT}`);
});
