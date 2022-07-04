/* eslint class-methods-use-this: ["error", { "enforceForClassFields": false }] */
import HeartbeatRepository from '../Repositories/heartBeat.repository';

export default class HeartbeatServices {
  public getHeartbeatRepo = (): any => {
    const heartBeatRepositoryInstance = new HeartbeatRepository();
    return heartBeatRepositoryInstance.getHeartbeatModel();
  };
}
