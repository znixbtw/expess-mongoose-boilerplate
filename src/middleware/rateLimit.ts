import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import createError from 'http-errors';

const errorMessage = 'You are being rate-limited.';

export default {
	auth: rateLimit({
		windowMs: 15 * 60 * 1000, // 15 minutes
		max: 5, // Limit each IP to 5 requests per `window` (here, per 15 minutes)
		standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
		legacyHeaders: false, // Disable the `X-RateLimit-*` headers
		skipSuccessfulRequests: true, // Skip if request is successful
		handler: (req: Request, res: Response, next: NextFunction) =>
			next(new createError.TooManyRequests(errorMessage)),
	}),

	global: rateLimit({
		windowMs: 15 * 60 * 1000, // 15 minutes
		max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
		standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
		legacyHeaders: false, // Disable the `X-RateLimit-*` headers
		handler: (req: Request, res: Response, next: NextFunction) =>
			next(new createError.TooManyRequests(errorMessage)),
	}),
};
