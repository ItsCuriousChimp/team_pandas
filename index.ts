import express, {Express, Response, Request} from 'express';
// @ts-ignore
import HBC from './components/heartBeat/Controllers/heartBeat.controller.ts';

const PORT = 8000;

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
	res.send('Hello fellow chimp! get your heartbeat at /heartbeat');
});

app.get('/heartbeat', HBC.getTimeStamp);

app.listen(process.env.NODE_ENV || PORT, () => {
	// eslint-disable-next-line no-console
	console.log(`Server running at PORT ${PORT}`);
});
