/* eslint class-methods-use-this: ["error", { "enforceForClassFields": false }] */
import HeartbeatModel from '../../../common/Models/heartBeat.model';

export default class HeartbeatRepository {
  public getHeartbeatModel = () => {
    const heartBeatValue = new HeartbeatModel(new Date());
    return heartBeatValue;
  };
}
