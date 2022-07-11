import express, { Express, Response, Request } from "express";
import HeartbeatControllerInstance from "./components/heartbeat/Controllers/heartbeat.Controller";
import { AccountControllerInstance } from "./components/BMS/controllers/account.controller";

const PORT = 3000;
const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("HELLO WORLD! get your heartbeat from /heartbeat");
});

app.get("/heartbeat", HeartbeatControllerInstance.getTimeStamp);
app.get("/login", [AccountControllerInstance.getToken]);

app.listen(process.env.NODE_ENV || PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at PORT ${PORT}`);
});
