// @ts-ignore
import getBeat from '../Services/heartBeatServices.ts';
// @ts-ignore
import currentHeartBeatStamp from '../../../payloads/heartbeatResponsePayload.ts';

const getHeartbeat = (req:Request, res:any) => {
	const beat = getBeat();
	beat.heartBeat = currentHeartBeatStamp();
	res.send(beat);
};

export default getHeartbeat;
