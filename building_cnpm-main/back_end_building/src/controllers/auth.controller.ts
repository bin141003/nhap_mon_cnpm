import { NextFunction, Request, Response } from 'express';
import { PERMISSION_ERROR, RESPONSE_SUCCESS } from '../constants/constants';
import * as authService from '../services/auth.service';
import { AppError } from '../utility/appError.util';
import env from '../../env';

export const login = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const user = await authService.authenticate(
			req.body.email,
			req.body.password,
		);
		if (user == null) {
			throw new AppError(PERMISSION_ERROR, 'email or password mismatch');
		}

		const token = authService.getToken(user, env.app.jwtExpiredIn);

		return res.status(RESPONSE_SUCCESS).json(token);
	} catch (e) {
		next(e);
	}
};
