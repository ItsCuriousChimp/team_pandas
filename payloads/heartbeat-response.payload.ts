export default class HeartbeatResponsePayload {
  private lastBeatGeneratedAt: Date;

  constructor(beat: Date) {
    this.lastBeatGeneratedAt = beat;
  }
}
