import { HeartbeatModel } from "../models/heartbeat.Model";

export class HeartbeatRepository {
  public getBeat(): HeartbeatModel {
    const date = new Date();
    return new HeartbeatModel(date);
  }
}
