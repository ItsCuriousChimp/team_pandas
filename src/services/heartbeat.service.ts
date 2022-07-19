import { HeartbeatModel } from "../models/heartbeat.model";
import { heartbeatRepository } from "../repositories/heartbeat.repository";

class HeartbeatService {
  public getBeat(): HeartbeatModel {
    return heartbeatRepository.getBeat();
  }
}

export const heartbeatService = new HeartbeatService();
