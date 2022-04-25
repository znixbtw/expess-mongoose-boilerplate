// Base
import { Model } from 'mongoose';

interface IUserBase {
	_id: string;
	username: string;
	email: string;
	password: string;
	isEmailVerified: boolean;
	role: number;
}

// Instance
interface IUser extends IUserBase {
	checkPassword(password: string): Promise<boolean>;
}

// Static
interface IUserMethod extends Model<IUser> {
	isUsernameTaken(username: string): Promise<boolean>;
	isEmailTaken(email: string): Promise<boolean>;
	findByUsername(username: string): Promise<IUser | null>;
}

export { IUserBase, IUser, IUserMethod };
