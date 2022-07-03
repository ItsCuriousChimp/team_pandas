import { HeartbeatRepository } from "../Repositories/heartbeat.Repository";

export class HeartbeatServices {
  checkBeat: boolean | undefined;
  // constructor(checkBeat: boolean) {
  //     this.checkBeat = checkBeat;
  // }
  public getHeartbeatRepo = () => {
    const heartbeatRepositoryInstance = new HeartbeatRepository();
    this.checkBeat = heartbeatRepositoryInstance.checkIfAlive().isAlive;
    return this.checkBeat;
  };
}
