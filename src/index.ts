import express, { Express, Response, Request } from "express";
import movieDetailsRouter from "./routes/movieDetails.route";
const PORT = 3000;
const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("HELLO WORLD!");
});

app.use("/movie", movieDetailsRouter);

app.listen(process.env.NODE_ENV || PORT, () => {
  console.log(`Server running at PORT ${PORT}`);
});
