export default class HeartbeatModel {
  lastBeatGeneratedAt: Date;

  constructor(heartBeat: Date) {
    this.lastBeatGeneratedAt = heartBeat;
  }
}
