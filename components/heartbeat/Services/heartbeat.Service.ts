import { HeartbeatRepository } from "../Repositories/heartbeat.Repository";

export class HeartbeatServices {
  public getBeat(): any {
    const heartbeatRepositoryInstance = new HeartbeatRepository();
    return heartbeatRepositoryInstance.getBeat();
  }
}
