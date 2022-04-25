import { Request, Response } from 'express';
import service from './service';
import { jwt } from '../../../utils';

/**
 * Auth Controller
 */
export default {
	/**
	 * Create a new user.
	 */
	register: async (req: Request, res: Response) => {
		const user = await service.register(req.body);
		res.json({ response: user });
	},
	/**
	 * Login with username and password.
	 */
	login: async (req: Request, res: Response) => {
		const user = await service.login(req.body);
		const accessToken = jwt.generateAuthToken(user, 'access');
		res.json({ response: accessToken });
	},
};
