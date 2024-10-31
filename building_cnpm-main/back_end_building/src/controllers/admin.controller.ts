import { NextFunction, Request, Response } from 'express';
import { RESPONSE_SUCCESS } from '../constants/constants';
import * as adminServices from '../services/admin.service';
import { DataResponse } from '../interfaces/response.interface';

export const register = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { name, email, password, role } = req.body;
		const user = await adminServices.register(name, email, password, role);
		return res
			.status(RESPONSE_SUCCESS)
			.json(new DataResponse(0, user, 'OK'));
	} catch (e) {
		next(e);
	}
};

export const getUsers = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const limit = Number(req.query.limit) || 10;
		const page = Number(req.query.page) || 1;
		const name = req.query.name ? String(req.query.name) : null;
		const { users, count } = await adminServices.getUsers(
			limit,
			page,
			name,
		);
		return res.status(RESPONSE_SUCCESS).json(
			new DataResponse(
				0,
				{
					users,
					total: users.length,
					limit,
					page,
					count,
				},
				'OK',
			),
		);
	} catch (e) {
		next(e);
	}
};

export const updateUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = Number(req.params.id);
		const { name, email, password, role } = req.body;
		const user = await adminServices.updateUser(
			id,
			name,
			email,
			password,
			role,
		);
		return res
			.status(RESPONSE_SUCCESS)
			.json(new DataResponse(0, user, 'OK'));
	} catch (e) {
		next(e);
	}
};

export const deleteUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = Number(req.params.id);
		const user = await adminServices.deleteUser(id);
		return res
			.status(RESPONSE_SUCCESS)
			.json(new DataResponse(0, user, 'OK'));
	} catch (error) {
		next(error);
	}
};

//fee
export const addFee = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { type, description, price } = req.body;
		const fee = await adminServices.addFee(type, description, price);
		return res
			.status(RESPONSE_SUCCESS)
			.json(new DataResponse(0, fee, 'OK'));
	} catch (e) {
		next(e);
	}
};

export const updateFee = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = Number(req.params.id);
		const { type, description, price } = req.body;
		const fee = await adminServices.updateFee(id, type, description, price);
		return res
			.status(RESPONSE_SUCCESS)
			.json(new DataResponse(0, fee, 'OK'));
	} catch (e) {
		next(e);
	}
};

export const deleteFee = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = Number(req.params.id);
		const fee = await adminServices.deteleFee(id);
		return res
			.status(RESPONSE_SUCCESS)
			.json(new DataResponse(0, fee, 'OK'));
	} catch (e) {
		next(e);
	}
};

//vehicle
export const addVehicleType = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { name, monthlyFee } = req.body;
		const vehicle = await adminServices.addVehicleType(name, monthlyFee);
		return res
			.status(RESPONSE_SUCCESS)
			.json(new DataResponse(0, vehicle, 'OK'));
	} catch (e) {
		next(e);
	}
};

export const updateVehicleType = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = Number(req.params.id);
		const { name, monthlyFee } = req.body;
		const vehicle = await adminServices.updateVehicleType(
			id,
			name,
			monthlyFee,
		);
		return res
			.status(RESPONSE_SUCCESS)
			.json(new DataResponse(0, vehicle, 'OK'));
	} catch (error) {
		next(error);
	}
};

export const deleteVehicleType = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = Number(req.params.id);
		const vehicle = await adminServices.deteleVehicleType(id);
		return res
			.status(RESPONSE_SUCCESS)
			.json(new DataResponse(0, vehicle, 'OK'));
	} catch (error) {
		next(error);
	}
};
