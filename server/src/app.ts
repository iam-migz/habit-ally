import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import config from 'config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connect from './utils/connect';
import deserializeUser from './midllewares/deserializeUser';
import errorHandler from './midllewares/errorHandler';
import router from './routes';
import morgan from 'morgan';
import moment from 'moment-timezone';

const port = config.get<number>('port');

const app = express();

app.use(
	cors({
		origin: config.get('origin'),
		credentials: true,
	})
);
app.use(cookieParser());
app.use(express.json());

morgan.token('date', (req, res, tz) => {
	return moment().tz('Asia/Manila').format('YYYY-MM-DD hh:mm');
});
morgan.format('myformat', '[:date[Asia/Manila]] :method :url :status - :response-time ms');
app.use(morgan('myformat'));

app.use(deserializeUser);
app.use('/api', router);

app.use(errorHandler);

app.listen(port, async () => {
	console.log(`Listening: http://localhost:${port}`);
	await connect();
});

// TODO
/*
1. if habit is deleted also delete all the records
2. record date must not be unique

*/
