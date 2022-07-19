import { heartbeatRepository } from "../repositories/heartbeat.repository";

class HeartbeatService {
  public getBeat(): any {
    return heartbeatRepository.getBeat();
  }
}

export const heartbeatService = new HeartbeatService();
