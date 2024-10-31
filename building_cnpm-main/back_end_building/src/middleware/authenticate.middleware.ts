import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { PERMISSION_ERROR } from '../constants/constants';
import { AppError } from '../utility/appError.util';
import env from '../../env';

export const verifyToken = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const token = req.header('Authorization')?.replace('Bearer ', '');
		if (!token) {
			throw new AppError(PERMISSION_ERROR, 'Unauthenticated!');
		}
		const jwtScret: string = env.app.jwtSecret || 'scret';
		const user: JwtPayload | string = jwt.verify(token, jwtScret);
		req.user = user;
		next();
	} catch (error) {
		next(error);
	}
};

export const isAdmin = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const user = req.user as JwtPayload;
		if (user.role !== 1) {
			throw new AppError(PERMISSION_ERROR, 'Unauthenticated!');
		}
		next();
	} catch (error) {
		next(error);
	}
};
