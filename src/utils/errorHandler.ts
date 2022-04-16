import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils';
import config from '../config';

interface Error {
	status?: number;
	message?: string;
}

export default {
	/**
	 * Error 404 handler
	 */
	notFound: (req: Request, res: Response, next: NextFunction): void => {
		next({
			status: 404,
			message: 'Endpoint not found.',
		});
	},

	/**
	 * Controller/service exception handler
	 */
	handler: (fn: any) => (req: Request, res: Response, next: NextFunction) => {
		Promise.resolve(fn(req, res, next)).catch((err: Error) => {
			logger.error(err.status);
			next(err);
		});
	},

	/**
	 * Exception handler
	 */
	global: (err: Error, req: Request, res: Response, next: NextFunction): void => {
		const statusCode: number = err.status || 500;
		let message: string;

		if (statusCode === 500 && err.message) {
			logger.error(err.message);
			message = config.env.NODE_ENV === 'development' ? err.message : 'Unexpected error';
		} else message = err.message || 'Unexpected unknown error';

		res.status(statusCode).json({
			error: true,
			response: message,
		});
	},
};
