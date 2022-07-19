export class HeartbeatModel {
    lastBeatGeneratedAt: Date;
    constructor(lastBeatGeneratedAt: Date) {
      this.lastBeatGeneratedAt = lastBeatGeneratedAt;
    }
  }