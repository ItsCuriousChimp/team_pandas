import { HeartbeatModel } from "../../../common/models/heartbeat.Model";

export class HeartbeatRepository {
  public checkIfAlive(): HeartbeatModel {
    return new HeartbeatModel(true);
  }
}
