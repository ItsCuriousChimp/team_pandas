import express, { Express, Response, Request } from "express";
import { heartbeatController } from "./src/controllers/heartbeat.controller";
import { cityController } from "./src/controllers/city.controller";

const PORT = 3000;
const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("HELLO WORLD! get your heartbeat from /heartbeat");
});

app.get("/heartbeat", heartbeatController.getTimeStamp);

app.get("/cities", cityController.getAllCities);

app.listen(process.env.NODE_ENV || PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at PORT ${PORT}`);
});
