import { HeartbeatRepository } from "../repositories/heartbeat.repository";

export class HeartbeatServices {
  public getBeat(): any {
    const heartbeatRepositoryInstance = new HeartbeatRepository();
    return heartbeatRepositoryInstance.getBeat();
  }
}
