import { Request, Response } from 'express';
import service from './service';

export default {
	/**
	 * Login with username and password.
	 */
	login: async (req: Request, res: Response): Promise<void> => {
		const { username, password } = req.body;
		const { jwt } = await service.login(username, password);
		res.json({ response: jwt });
	},
};
