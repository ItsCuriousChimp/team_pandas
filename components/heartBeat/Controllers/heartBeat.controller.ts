/* eslint class-methods-use-this: ["error", { "enforceForClassFields": false }] */
import {Request, Response} from 'express';
import HeartbeatServices from '../Services/heartBeat.services';
import currentHeartBeatStamp from '../../../payloads/heartbeatResponsePayload';

class HeartbeatController {
  getTimeStamp = (req: Request, res: Response) => {
    const heartbeatServicesInstance = new HeartbeatServices();
    heartbeatServicesInstance.getHeartbeatRepo().heartBeat =
      currentHeartBeatStamp();

    return res.send(heartbeatServicesInstance.getHeartbeatRepo());
  };
}
const HBC = new HeartbeatController();
export default HBC;
