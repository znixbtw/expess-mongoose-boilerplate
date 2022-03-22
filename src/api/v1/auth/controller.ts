import { NextFunction, Request, Response } from 'express';
import service from './service';

export default {
	login: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			const { username, password } = req.body;
			const { jwt } = await service.login(username, password);
			res.json({ response: jwt });
		} catch (error) {
			next(error);
		}
	},
};
