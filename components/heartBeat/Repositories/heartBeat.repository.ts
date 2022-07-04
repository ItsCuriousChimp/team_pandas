import HeartbeatModel from '../../../common/Models/heartBeat.model';

export default class HeartbeatRepository{
	public getHeartbeatModel=(beat:number)=>{
		const heartBeatValue = new HeartbeatModel(beat);
		return heartBeatValue;
	};
}
