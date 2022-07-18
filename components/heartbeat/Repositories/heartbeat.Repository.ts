import { HeartbeatModel } from "../../../common/models/heartbeat.model";

export class HeartbeatRepository {
  public getBeat(): HeartbeatModel {
    const date = new Date();
    return new HeartbeatModel(date);
  }
}
