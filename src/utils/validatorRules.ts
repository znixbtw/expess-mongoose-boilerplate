import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { logger } from '../utils';

export default {
	validate: (req: Request, res: Response, next: NextFunction): void => {
		const errors = validationResult(req);
		if (errors.isEmpty()) next();

		logger.debug(errors);
		const array: (string | any)[] = [];

		errors
			.array()
			.forEach((error: { param: string; msg: string }) => array.push({ param: error.param, msg: error.msg }));

		res.status(400).json({
			error: true,
			response: array,
		});
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
