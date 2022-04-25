import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import config from '../config';
import { logger } from '../utils';

import { IUser } from '../interface';

const generateToken = (payload: string | object, expiresIn: string): string =>
	jwt.sign(payload, config.env.TOKEN_SECRET, { expiresIn });

export default {
	/**
	 * Generates JWT Access Token
	 */
	generateAuthToken: (user: IUser, type: 'access' | 'refresh') => generateToken({ uuid: user._id, type }, '7d'),
	/**
	 * Verifies JWT Token
	 */
	verifyToken: (token: string) =>
		jwt.verify(token, config.env.TOKEN_SECRET, (err, decoded) => {
			console.log(decoded);
			if (err) {
				logger.debug(err);
				throw new createError.NotFound('User not found.');
			}
			return decoded;
		}),
};
