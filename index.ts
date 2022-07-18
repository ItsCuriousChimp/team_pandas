import express, { Express, Response, Request, Router } from "express";
import { heartbeatController } from "./src/controllers/heartbeat.controller";
import theatreRoutes from "./src/routes/theatre.route";
const PORT = 3000;
const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("HELLO WORLD! get your heartbeat from /heartbeat");
});

app.get("/heartbeat", heartbeatController.getTimeStamp);
//theatre routes
app.use("/theatres", theatreRoutes);

app.listen(process.env.NODE_ENV || PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at PORT ${PORT}`);
});
