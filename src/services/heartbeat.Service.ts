import { HeartbeatRepository } from "../repositories/heartbeat.Repository";

export class HeartbeatService {
  public getBeat(): any {
    const heartbeatRepositoryInstance = new HeartbeatRepository();
    return heartbeatRepositoryInstance.getBeat();
  }
}
