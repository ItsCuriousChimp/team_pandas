/* eslint class-methods-use-this: ["error", { "enforceForClassFields": false }] */
import {Request, Response} from 'express';
import HeartbeatServices from '../Services/heartBeat.services';
import HeartbeatResponsePayload from '../../../payloads/heartbeat-response.payload';

class HeartbeatController {
  getTimeStamp = (req: Request, res: Response) => {
    const heartbeatServicesInstance = new HeartbeatServices();
    const currentTimeStamp =
      heartbeatServicesInstance.getHeartbeatRepo().heartBeat;
    const heartbeatResponsePayloadInstance = new HeartbeatResponsePayload(
      currentTimeStamp,
    );

    return res.send(heartbeatResponsePayloadInstance);
  };
}
const HBC = new HeartbeatController();
export default HBC;
