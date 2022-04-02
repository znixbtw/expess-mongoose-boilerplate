import dotenv from 'dotenv';
import { IConfig, IEnv } from './interface';

dotenv.config();

const env = process.env as unknown as IEnv;

const environment: IConfig = {
	env: env.NODE_ENV,
	server: {
		port: env.SERVER_PORT,
	},
};

export default environment;
