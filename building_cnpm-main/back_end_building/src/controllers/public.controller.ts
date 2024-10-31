import { NextFunction, Request, Response } from 'express';
import * as publicServices from '../services/public.service';
import { DataResponse } from '../interfaces/response.interface';
import { Op } from 'sequelize';

export const getFees = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { limit, page, type } = req.query;
		const data: any = { where: {} };
		if (limit) data.limit = Number(limit);
		if (page) data.offset = (Number(page) - 1) * Number(limit);
		if (type) data.where.type = { [Op.like]: `%${type}%` };
		const fees = await publicServices.getFees(data);
		return res
			.status(200)
			.json(
				new DataResponse(
					0,
					{ fees: fees.rows, limit, page, count: fees.count },
					'OK',
				),
			);
	} catch (error) {
		next(error);
	}
};

export const getVehicleTypes = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const limit = Number(req.query.limit) || 10;
	const page = Number(req.query.page) || 1;
	try {
		const vehicleTypes = await publicServices.getVehicleTypes(limit, page);
		return res.status(200).json(
			new DataResponse(
				0,
				{
					vehicles: vehicleTypes.rows,
					limit: limit,
					page: page,
					count: vehicleTypes.count,
				},
				'OK',
			),
		);
	} catch (error) {
		next(error);
	}
};

export const getHouseholds = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const limit = Number(req.query.limit) || 10;
		const page = Number(req.query.page) || 1;
		const houseNumber = req.query.houseNumber
			? String(req.query.houseNumber)
			: null;

		console.log(houseNumber);
		const households = await publicServices.getHouseholds(
			limit,
			page,
			houseNumber,
		);
		return res
			.status(200)
			.json(
				new DataResponse(
					0,
					{ households, limit, page, total: households.length },
					'OK',
				),
			);
	} catch (error) {
		next(error);
	}
};

export const getHouseholdCount = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const houseNumber = req.query.houseNumber
			? String(req.query.houseNumber)
			: null;
		const count = await publicServices.getHouseholdCount(houseNumber);
		return res.status(200).json(new DataResponse(0, count, 'OK'));
	} catch (error) {
		next(error);
	}
};

export const checkHousehold = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { phoneNumber } = req.body;
		const id = Number(req.params.id);
		const check = await publicServices.checkHousehold(id, phoneNumber);
		return res.status(200).json(new DataResponse(0, check, 'OK'));
	} catch (error) {
		next(error);
	}
};

export const getHousehold = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = Number(req.params.id);
		const phoneNumber = req.query.phoneNumber;
		const where: any = { id };
		if (phoneNumber) {
			where.phoneNumber = phoneNumber;
		}
		const household = await publicServices.getHousehold(where);
		return res.status(200).json(new DataResponse(0, household, 'OK'));
	} catch (error) {
		next(error);
	}
};

export const getVoluntaryContributions = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { limit, page } = req.query;
		const data: any = { where: {} };
		if (limit) data.limit = Number(limit);
		if (page) data.offset = (Number(page) - 1) * Number(limit);
		const voluntaryContributions =
			await publicServices.getVoluntaryContributions(data);
		return res.status(200).json(
			new DataResponse(
				0,
				{
					voluntaryContributions: voluntaryContributions.rows,
					count: voluntaryContributions.count,
					limit,
					page,
				},
				'OK',
			),
		);
	} catch (error) {
		next(error);
	}
};
