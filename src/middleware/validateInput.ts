import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { logger } from '../lib';

const validateInput = (req: Request, res: Response, next: NextFunction) => {
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
};

export default validateInput;
