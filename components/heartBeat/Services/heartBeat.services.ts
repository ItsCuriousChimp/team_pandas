import HeartbeatRepository from '../Repositories/heartBeat.repository';

export default class HeartbeatServices{
	public getHeartbeatRepo=(beat:number)=>{
		const heartBeatRepositoryInstance = new HeartbeatRepository();
		return heartBeatRepositoryInstance.getHeartbeatModel(beat);
	};
}
