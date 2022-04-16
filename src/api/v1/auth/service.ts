import createError from 'http-errors';

export default {
	/**
	 * Login logic
	 */
	login: async (username: string, password: string): Promise<{ jwt: string }> => {
		// dummy code
		if (username !== password) throw new createError.NotFound('user not found');
		return {
			jwt: username,
		};
	},
};
