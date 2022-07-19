import { HeartbeatModel } from "../models/heartbeat.model";

class HeartbeatRepository {
  public getBeat(): HeartbeatModel {
    const date = new Date();
    return new HeartbeatModel(date);
  }
}

export const heartbeatRepository = new HeartbeatRepository();
