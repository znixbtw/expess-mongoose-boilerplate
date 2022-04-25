import createError from 'http-errors';
import { User } from '../../../model';

interface IRegisterBody {
	username: string;
	email: string;
	password: string;
}

interface ILoginBody {
	username: string;
	password: string;
}

/**
 * Auth Service
 */
export default {
	/**
	 * Registers user to database
	 */
	register: async (user: IRegisterBody) => {
		if (await User.isUsernameTaken(user.username)) throw new createError.Conflict('Username is taken.');
		if (await User.isEmailTaken(user.email)) throw new createError.Conflict('Email is taken.');
		return User.create(user);
	},
	/**
	 * Login logic
	 */
	login: async ({ username, password }: ILoginBody) => {
		const user = await User.findByUsername(username);
		if (!user || !(await user.checkPassword(password))) throw new createError.NotFound('User not found.');
		console.log(user._id);
		return user;
	},
};
