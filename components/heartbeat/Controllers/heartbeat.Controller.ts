import { Request, Response } from "express";
import { HeartbeatServices } from "../Services/heartbeat.Service";
import { HeartbeatResponsePayload } from "../../../payloads/heartbeat-Response.Payload";

class HeartbeatController {
  getTimeStamp = (req: Request, res: Response) => {
    const heartbeatServicesInstance = new HeartbeatServices();
    const currentTimestamp = heartbeatServicesInstance.getBeat().beatTimestamp;
    const HeartbeatResponsePayloadInstance = new HeartbeatResponsePayload(
      currentTimestamp
    );
    return res.send(HeartbeatResponsePayloadInstance.heartbeatTimestamp);
  };
}
const HeartbeatControllerInstance = new HeartbeatController();
const viewTimeStamp = HeartbeatControllerInstance.getTimeStamp;
export default viewTimeStamp;
