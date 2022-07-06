export class HeartbeatResponsePayload {
    lastBeatGeneratedAt: Date;
    constructor(lastBeatGeneratedAt: Date) {
      this.lastBeatGeneratedAt = lastBeatGeneratedAt;
    }
  }
  