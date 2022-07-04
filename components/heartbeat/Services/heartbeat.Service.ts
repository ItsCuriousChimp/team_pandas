import { HeartbeatRepository } from "../Repositories/heartbeat.Repository";

export class HeartbeatServices {
  public getRepobeat(): Date {
    const heartbeatRepositoryInstance = new HeartbeatRepository();
    const beat = heartbeatRepositoryInstance.getBeat().beatTimestamp;
    return beat;
  }
}
