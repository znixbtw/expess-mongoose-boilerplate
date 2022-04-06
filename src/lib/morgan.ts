import Morgan, { StreamOptions } from 'morgan';
import { Request, Response } from 'express';
import { logger } from '@lib';

const stream: StreamOptions = {
	write: (message: string) => logger.http(message.substring(0, message.lastIndexOf('\n'))),
};

const format = ':method :url :status [:response-time ms]';

const morgan = Morgan(format, {
	stream,
	skip: function (req: Request, res: Response) {
		return res.statusCode < 400;
	},
});

export default morgan;
