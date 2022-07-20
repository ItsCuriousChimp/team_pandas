import express, { Express, Response, Request } from "express";
import { heartbeatController } from "./controllers/heartbeat.controller";
import moviesCityLanguageRouter from "./routes/moviesCityLanguage.route";
const PORT = 3000;
const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("HELLO WORLD!");
});

app.get("/heartbeat", heartbeatController.getTimeStamp);
app.use("/getMoviesInCityByLanguage",moviesCityLanguageRouter);

app.listen(process.env.NODE_ENV || PORT, () => {
  console.log(`Server running at PORT ${PORT}`);
});
