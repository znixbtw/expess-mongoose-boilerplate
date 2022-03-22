import { body } from 'express-validator';

export default {
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
