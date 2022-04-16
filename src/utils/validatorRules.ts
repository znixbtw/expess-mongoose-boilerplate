import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { validationResult } from 'express-validator';
import { logger } from '../utils';

export default {
	validate: (req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			logger.debug(errors);
			const array: (string | any)[] = [];
			errors.array().forEach((error: any) => array.push({ param: error.param, msg: error.msg }));
			return res.status(400).json({
				error: true,
				response: array,
			});
		}
		next();
	},

	username: () =>
		body('username', 'invalid username')
			//
			.notEmpty()
			.bail()
			//
			.isLength({ min: 4, max: 15 })
			.bail()
			//
			.isAlphanumeric()
			.bail()
			//
			.trim(),

	password: () =>
		body('password', 'invalid password')
			//
			.notEmpty()
			.bail()
			//
			.isLength({ min: 6, max: 150 })
			.bail(),
};
