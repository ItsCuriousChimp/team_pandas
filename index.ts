import express, { Express,Response,Request } from "express";
const PORT = 8080;
const heartBeatController = require("./components/heartBeat/Controllers/heartBeatController")

const app:Express = express();

app.get('/', (req:Request, res:Response) => {
    res.send("Hello fellow chimp! get your heartbeat at /heartbeat");
})

app.get('/heartbeat', heartBeatController.getHeartbeat);

app.listen(process.env.NODE_ENV || PORT, () => {
    console.log(`Server running at PORT ${ PORT }`);
});