import { HeartbeatRepository } from "../repositories/heartbeat.Repository";

export class HeartbeatServices {
  public getBeat(): any {
    const heartbeatRepositoryInstance = new HeartbeatRepository();
    return heartbeatRepositoryInstance.getBeat();
  }
}
