import { Request, Response } from "express";
import { heartbeatService } from "../services/heartbeat.service";
import { HeartbeatResponsePayload } from "../data/payloads/heartbeat-Response.payload";

class HeartbeatController {
  getTimeStamp = (req: Request, res: Response) => {
    const currentTimestamp = heartbeatService.getBeat().lastBeatGeneratedAt;
    const HeartbeatResponsePayloadInstance = new HeartbeatResponsePayload(
      currentTimestamp
    );
    return res.send(HeartbeatResponsePayloadInstance);
  };
}

export const heartbeatController = new HeartbeatController();
