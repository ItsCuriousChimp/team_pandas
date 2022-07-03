import { Request, Response } from "express";
import { HeartbeatServices } from "../Services/heartbeat.Service";
import { HeartbeatStamp } from "../../../payloads/heartbeatResponse.Payload";

class HeartbeatController {
  private heartbeatTimestamp: Date | undefined;
  getTimeStamp = (req: Request, res: Response) => {
    const heartbeatServicesInstance = new HeartbeatServices();
    const currentStamp = new HeartbeatStamp();

    this.heartbeatTimestamp = currentStamp.getBeat();
    if (heartbeatServicesInstance.getHeartbeatRepo()) {
      return res.send(this.heartbeatTimestamp);
    } else {
      return res.send("error");
    }
  };
}
const HeartbeatControllerInstance = new HeartbeatController();
const viewTimeStamp = HeartbeatControllerInstance.getTimeStamp;
export default viewTimeStamp;
