import { Request, Response } from "express";
import { heartbeatService } from "../services/heartbeat.service";
import { HeartbeatResponsePayload } from "../data/payloads/heartbeat-response.payload";

class HeartbeatController {
  getTimeStamp = (req: Request, res: Response) => {
    const currentTimestamp = heartbeatService.getBeat().lastBeatGeneratedAt;
    const heartbeatResponsePayload = new HeartbeatResponsePayload(
      currentTimestamp
    );
    return res.send(heartbeatResponsePayload);
  };
}

export const heartbeatController = new HeartbeatController();
