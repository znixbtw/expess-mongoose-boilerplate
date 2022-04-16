import winston from 'winston';
import config from '../config';

const levels = {
	error: 0,
	warn: 1,
	info: 2,
	http: 3,
	debug: 4,
};

const level = (): string => (config.env.NODE_ENV === 'development' ? 'debug' : 'http');

const transports = [
	new winston.transports.Console(),
	new winston.transports.File({
		filename: 'logs/error.log',
		level: 'error',
	}),
	new winston.transports.File({ filename: 'logs/all.log' }),
];

const logger = winston.createLogger({
	level: level(),
	levels,
	transports,
	exitOnError: false,
});

export default logger;
