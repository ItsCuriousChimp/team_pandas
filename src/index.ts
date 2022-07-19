import express, { Express, Response, Request } from "express";
import movieDetailsRouter from "./routes/movieDetails.route";
import moviesCityLanguageRouter from "./routes/moviesCityLanguage.route";
const PORT = 3000;
const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("HELLO WORLD!");
});

app.use("/getMoviesInCityByLanguage",moviesCityLanguageRouter);
app.use("/getMovieDetails",movieDetailsRouter);

app.listen(process.env.NODE_ENV || PORT, () => {
  console.log(`Server running at PORT ${PORT}`);
});
