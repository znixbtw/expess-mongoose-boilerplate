import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';

import { logger } from './index';
import config from '../config';

interface Error {
	status?: number;
	message?: string;
}

export default {
	// 404
	notFound: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		next(new createError.NotFound('Endpoint not found.'));
	},

	// Global Handler
	global: (err: Error, req: Request, res: Response, next: NextFunction): void => {
		const statusCode: number = err.status || 500;
		let { message } = err;

		if (statusCode === 500) {
			logger.error(err.message);
			message = config.env === 'development' ? err.message : 'Unexpected error';
		} else {
			logger.info(err.message);
		}

		res.status(statusCode).json({
			error: true,
			response: message,
		});
	},
};
