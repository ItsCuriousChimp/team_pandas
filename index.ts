import express, { Express, Response, Request } from "express";
import HeartbeatControllerInstance from "./src/controllers/heartbeat.Controller";
import BookingRouter from "./src/routers/booking.router";

const PORT = 3000;
const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("HELLO WORLD! get your heartbeat from /heartbeat");
});

app.get("/heartbeat", HeartbeatControllerInstance.getTimeStamp);
app.use("/getBookingDetails", BookingRouter);

app.listen(process.env.NODE_ENV || PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at PORT ${PORT}`);
});
