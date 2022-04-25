import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { logger } from '../utils';

export default {
	validate: (req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			logger.debug(errors);
			const array: (string | any)[] = [];
			errors
				.array()
				.forEach((error: { param: string; msg: string }) => array.push({ param: error.param, msg: error.msg }));
			return res.status(400).json({
				error: true,
				response: array,
			});
		}
		next();
	},

	username: (param: string = 'username') =>
		body(param, `Invalid ${param}`)
			//
			.notEmpty()
			.bail()
			.isLength({ min: 4, max: 15 })
			.bail()
			.isAlphanumeric()
			.bail()
			//
			.trim(),

	email: (param: string = 'email') =>
		body(param, `Invalid ${param}`)
			//
			.notEmpty()
			.bail()
			.isLength({ min: 3, max: 100 })
			.bail()
			.isEmail()
			.bail()
			//
			.trim()
			.normalizeEmail(),

	password: (param: string = 'password') =>
		body(param, `Invalid ${param}`)
			//
			.notEmpty()
			.bail()
			.isLength({ min: 6, max: 150 })
			.withMessage('Please try that again.')
			.bail(),
};
