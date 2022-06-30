import { getBeat } from "../Services/heartBeatServices";
import { currentHeartBeatStamp } from "../../../payloads/heartbeatResponsePayload";

const getHeartbeat = (req:Request, res:any) => {
    const beat = getBeat();
    beat.heartBeat = currentHeartBeatStamp();
    res.send(beat);
}
export {getHeartbeat}