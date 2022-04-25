import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser, IUserMethod } from '../interface';

const userSchema = new Schema<IUser, IUserMethod>(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
			trim: true,
		},
		isEmailVerified: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true },
);

userSchema.statics.isUsernameTaken = async function (username: string, excludeUserId) {
	const user = await this.findOne({ username, _id: { $ne: excludeUserId } });
	return !!user;
};

userSchema.statics.isEmailTaken = async function (email: string, excludeUserId) {
	const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
	return !!user;
};

userSchema.statics.findByUsername = async function (username: string) {
	return this.findOne({ username });
};

userSchema.methods.checkPassword = async function (password: string) {
	return bcrypt.compare(password, this.password);
};

userSchema.pre('save', async function (next): Promise<void> {
	const user = this;
	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 10);
	}
	next();
});

const User = model<IUser, IUserMethod>('User', userSchema);

export default User;
