export class HeartbeatResponsePayload {
  heartbeatTimestamp: Date;
  constructor(heartbeatTimestamp: Date) {
    this.heartbeatTimestamp = heartbeatTimestamp;
  }
}
