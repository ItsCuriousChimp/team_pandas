import { HeartbeatModel } from "../models/heartbeat.model";
import { HeartbeatRepository } from "../repositories/heartbeat.repository";

class HeartbeatService {
  public getBeat(): HeartbeatModel {
    const heartbeatRepositoryInstance = new HeartbeatRepository();
    return heartbeatRepositoryInstance.getBeat();
  }
}

export const heartbeatService = new HeartbeatService();
