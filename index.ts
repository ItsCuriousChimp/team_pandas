import express, { Express, Response, Request } from "express";
import HeartbeatControllerInstance from "./src/controllers/heartbeat.Controller";
import LoginRouter from "./src/routes/login.route";

const PORT = 3000;
const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("HELLO WORLD! get your heartbeat from /heartbeat");
});

app.get("/heartbeat", HeartbeatControllerInstance.getTimeStamp);
app.use("/login", LoginRouter);

app.listen(process.env.NODE_ENV || PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at PORT ${PORT}`);
});
