import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import { jwt } from '../utils';

export default {
	/**
	 * Verify JWT Token Middleware
	 */
	verify: (req: Request, res: Response, next: NextFunction) => {
		const authHeader = req.headers.authorization;
		const token = authHeader && authHeader.split(' ');
		if (token && token[0] === 'Bearer') {
			const decoded = jwt.verifyToken(token[1]);
			res.locals.user = decoded;
			next();
		}
		throw new createError.Unauthorized();
	},
};
