const heartBeatRepo = require("../Repositories/heartBeatRepository");

const getBeat = () => {
    return heartBeatRepo.heartBeat();
}

export { getBeat }