// @ts-ignore
import HeartbeatRepository from '../Repositories/heartBeat.repository.ts';

export default class HeartbeatServices{
	private getBeat: number | undefined;

	public getHeartbeatRepo=(beat:number)=>{
		const heartBeatRepositoryInstance = new HeartbeatRepository();
		this.getBeat = heartBeatRepositoryInstance.getHeartbeatModel(beat);
		return this.getBeat;
	};
}
