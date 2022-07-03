import {Request,Response} from 'express';
// @ts-ignore
import HeartbeatServices from '../Services/heartBeat.services.ts';
// @ts-ignore
import currentHeartBeatStamp from '../../../payloads/heartbeatResponsePayload.ts';


class HeartbeatController{
	private heartbeatTimestamp: number;

	constructor(){
		this.heartbeatTimestamp = 0;
	}

	getTimeStamp = (req:Request,res:Response)=>{
		const heartbeatServicesInstance = new HeartbeatServices();
		this.heartbeatTimestamp = currentHeartBeatStamp();
		heartbeatServicesInstance.getHeartbeatRepo(this.heartbeatTimestamp);
		return res.send(heartbeatServicesInstance.getBeat);
	};
}
const HBC = new HeartbeatController();
export default HBC;
