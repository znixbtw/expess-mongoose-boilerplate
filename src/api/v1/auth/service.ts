import createError from 'http-errors';

export default {
	login: async (username: string, password: string) => {
		// dummy code, just for testings...
		if (username !== password) throw new createError.NotFound('user not found');
		return {
			jwt: username,
		};
	},
};
