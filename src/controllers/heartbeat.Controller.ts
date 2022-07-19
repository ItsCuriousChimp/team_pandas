import { Request, Response } from "express";
import { HeartbeatService } from "../services/heartbeat.Service";
import { HeartbeatResponsePayload } from "../payloads/heartbeat-Response.Payload";

class HeartbeatController {
  getTimeStamp = (req: Request, res: Response) => {
    const heartbeatServicesInstance = new HeartbeatService();
    const currentTimestamp =
      heartbeatServicesInstance.getBeat().lastBeatGeneratedAt;
    const HeartbeatResponsePayloadInstance = new HeartbeatResponsePayload(
      currentTimestamp
    );
    return res.send(HeartbeatResponsePayloadInstance);
  };
}
const HeartbeatControllerInstance = new HeartbeatController();
// const viewTimeStamp = HeartbeatControllerInstance.getTimeStamp;
export default HeartbeatControllerInstance;
