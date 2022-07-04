import {Request,Response} from 'express';
import HeartbeatServices from '../Services/heartBeat.services';
import currentHeartBeatStamp from '../../../payloads/heartbeatResponsePayload';

class HeartbeatController{
	getTimeStamp = (req:Request,res:Response)=>{
		const heartbeatServicesInstance = new HeartbeatServices();
		return res.send(heartbeatServicesInstance.getHeartbeatRepo(currentHeartBeatStamp()));
	};
}
const HBC = new HeartbeatController();
export default HBC;
