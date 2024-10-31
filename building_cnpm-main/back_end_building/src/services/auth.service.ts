import jwt from 'jsonwebtoken';
import env from '../../env';
import { PERMISSION_ERROR } from '../constants/constants';
import { db } from '../loaders/database.loader';
import { Users } from '../models/users.model';
import { AppError } from '../utility/appError.util';
import { EncUtil } from '../utility/encryption';

export async function authenticate(
	email: string,
	password: string,
): Promise<Users> {
	const user = await db.users.findOne({ where: { email: email } });
	if (user == null) {
		throw new AppError(PERMISSION_ERROR, 'email or password mismatch');
	}
	const isMatch = await EncUtil.comparePassword(password, user.password);

	if (!isMatch) {
		throw new AppError(PERMISSION_ERROR, 'email or password mismatch');
	}

	return user;
}

export function getToken(user: Users, expiresIn: string): string {
	return jwt.sign(
		{
			id: user.id,
			email: user.email,
			role: user.role,
		},
		env.app.jwtSecret,
		{
			expiresIn,
		},
	);
}
