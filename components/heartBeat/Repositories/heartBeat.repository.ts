// @ts-ignore
import HeartbeatModel from '../../../common/Models/heartBeat.model.ts';

export default class HeartbeatRepository{
	private heartBeatValue: number | undefined;

	public getHeartbeatModel=(beat:number):number | undefined=>{
		this.heartBeatValue = new HeartbeatModel(beat);
		return this.heartBeatValue;
	};

}
