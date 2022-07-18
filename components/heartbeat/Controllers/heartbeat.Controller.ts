import { Request, Response } from "express";
import { HeartbeatServices } from "../services/heartbeat.service";
import { HeartbeatResponsePayload } from "../../../payloads/heartbeat-Response.Payload";

class HeartbeatController {
  getTimeStamp = (req: Request, res: Response) => {
    const heartbeatServicesInstance = new HeartbeatServices();
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
