import { NextFunction, Request, Response } from 'express';
import { logger } from '@lib';
import config from '@config';

interface Error {
	status?: number;
	message?: string;
}

export default {
	/**
	 * Throws 404 Error
	 * @param req
	 * @param res
	 */
	notFound: (req: Request, res: Response): void => {
		res.status(404).json({
			error: true,
			response: 'Endpoint not found.',
		});
	},

	/**
	 * Controller/service exception handler
	 * @param fn
	 */
	handler: (fn: any) => (req: Request, res: Response, next: NextFunction) => {
		Promise.resolve(fn(req, res, next)).catch((err: Error) => {
			logger.info(err.message);

			const statusCode: number = err.status || 500;
			const message =
				statusCode === 500 ? (config.env === 'development' ? err.message : 'Unexpected error') : err.message;

			res.status(statusCode).json({
				error: true,
				response: message,
			});
		});
	},

	/**
	 * Unknown exception handler
	 * @param err
	 * @param req
	 * @param res
	 * @param next
	 */
	global: (err: Error, req: Request, res: Response, next: NextFunction): void => {
		logger.error(err.message);
		console.log('reached');
		const statusCode: number = err.status || 500;
		const message =
			statusCode === 500 ? (config.env === 'development' ? err.message : 'Unexpected error') : err.message;

		res.status(err.status || 500).json({
			error: true,
			response: message,
		});
	},
};
