/* eslint class-methods-use-this: ["error", { "enforceForClassFields": false }] */
import HeartbeatModel from '../../../common/Models/heartBeat.model';
import HeartbeatRepository from '../Repositories/heartBeat.repository';

export default class HeartbeatServices {
  public getHeartbeatRepo = (): HeartbeatModel => {
    const heartBeatRepositoryInstance = new HeartbeatRepository();
    return heartBeatRepositoryInstance.getHeartbeatModel();
  };
}
