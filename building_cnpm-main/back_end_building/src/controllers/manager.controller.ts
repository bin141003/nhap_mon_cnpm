import { NextFunction, Request, Response } from 'express';
import { PERMISSION_ERROR, RESPONSE_SUCCESS } from '../constants/constants';
import * as managerServices from '../services/manager.service';
import { DataResponse } from '../interfaces/response.interface';
import { Op } from 'sequelize';

// household
export const addHousehold = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { houseNumber, address, totalArea, phoneNumber } = req.body;
		const household = await managerServices.addHousehold(
			houseNumber,
			address,
			totalArea,
			phoneNumber,
		);

		return res
			.status(RESPONSE_SUCCESS)
			.json(new DataResponse(0, household, 'OK'));
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
		const limit = req.query.limit;
		const page = req.query.page;
		const houseNumber = req.query.name;
		let data: any = {};

		if (houseNumber) {
			data.where.houseNumber = {
				[Op.like]: `%${houseNumber}%`,
			};
		}
		if (limit) {
			data.limit = Number(limit);
		}
		if (page) {
			data.offset = (Number(page) - 1) * Number(limit);
		}
		const households = await managerServices.getHouseholds(data);
		return res.status(200).json(
			new DataResponse(
				0,
				{
					households: households.rows,
					count: households.count,
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

export const updateHousehold = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = Number(req.params.id);
		const { houseNumber, address, totalArea, phoneNumber } = req.body;
		const household = await managerServices.updateHousehold(
			id,
			houseNumber,
			address,
			totalArea,
			phoneNumber,
		);
		return res
			.status(RESPONSE_SUCCESS)
			.json(new DataResponse(0, household, 'OK'));
	} catch (error) {
		next(error);
	}
};

export const deleteHousehold = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = Number(req.params.id);
		const household = await managerServices.deleteHousehold(id);
		return res
			.status(RESPONSE_SUCCESS)
			.json(new DataResponse(0, household, 'OK'));
	} catch (error) {
		next(error);
	}
};

// fee details
export const getFeeDetails = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { limit, page, status } = req.query;
		const data: any = { where: {} };
		if (limit) {
			data.limit = Number(limit);
		}
		if (page) {
			data.offset = (Number(page) - 1) * Number(limit);
		}
		if (status) {
			data.where.status = status;
		}
		const feeDetails = await managerServices.getFeeDetails(data);
		return res.status(200).json(
			new DataResponse(
				0,
				{
					feeDetails: feeDetails.rows,
					count: feeDetails.count,
					limit,
					page,
					status,
				},
				'success',
			),
		);
	} catch (error) {
		next(error);
	}
};

export const getFeeDetail = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = Number(req.params.id);
		const feeDetail = await managerServices.getFeeDetail(id);
		return res.status(200).json(new DataResponse(0, feeDetail, 'OK'));
	} catch (error) {
		next(error);
	}
};

export const addFeeDetail = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { householdId, feeId, quantity, dueDate, status } = req.body;
		const fee = await managerServices.addFeeDetail(
			householdId,
			feeId,
			quantity,
			dueDate,
			status,
		);
		return res
			.status(RESPONSE_SUCCESS)
			.json(new DataResponse(0, fee, 'OK'));
	} catch (error) {
		next(error);
	}
};

export const updateFeeDetail = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = Number(req.params.id);
		const { householdId, feeId, quantity, dueDate, status } = req.body;
		const fee = await managerServices.updateFeeDetail(
			id,
			householdId,
			feeId,
			quantity,
			dueDate,
			status,
		);
		return res
			.status(RESPONSE_SUCCESS)
			.json(new DataResponse(0, fee, 'OK'));
	} catch (error) {
		next(error);
	}
};

export const deleteFeeDetail = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = Number(req.params.id);
		const fee = await managerServices.deleteFeeDetail(id);
		return res
			.status(RESPONSE_SUCCESS)
			.json(new DataResponse(0, fee, 'OK'));
	} catch (error) {
		next(error);
	}
};
// vehicle details
export const getVehicleDetails = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { limit, page } = req.query;
		const data: any = {};
		if (limit) {
			data.limit = Number(limit);
		}
		if (page) {
			data.offset = (Number(page) - 1) * Number(limit);
		}
		const vehicles = await managerServices.getVehicleDetails(data);
		return res.status(200).json(
			new DataResponse(
				0,
				{
					vehicleDetails: vehicles.rows,
					count: vehicles.count,
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

export const getVehicleDetail = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = Number(req.params.id);
		const vehicle = await managerServices.getVehicleDetail(id);
		return res.status(200).json(new DataResponse(0, vehicle, 'OK'));
	} catch (error) {
		next(error);
	}
};

export const addVehicleDetail = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { householdId, vehicleTypeId, registrationNumber } = req.body;
		const vehicle = await managerServices.addVehicleDetail(
			householdId,
			vehicleTypeId,
			registrationNumber,
		);
		return res
			.status(RESPONSE_SUCCESS)
			.json(new DataResponse(0, vehicle, 'OK'));
	} catch (error) {
		next(error);
	}
};

export const updateVehicleDetail = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = Number(req.params.id);
		const { householdId, vehicleTypeId, registrationNumber } = req.body;
		const vehicle = await managerServices.updateVehicleDetail(
			id,
			householdId,
			vehicleTypeId,
			registrationNumber,
		);
		return res
			.status(RESPONSE_SUCCESS)
			.json(new DataResponse(0, vehicle, 'OK'));
	} catch (error) {
		next(error);
	}
};

export const deleteVehicleDetail = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = Number(req.params.id);
		const vehicle = await managerServices.deleteVehicleDetail(id);
		return res
			.status(RESPONSE_SUCCESS)
			.json(new DataResponse(0, vehicle, 'OK'));
	} catch (error) {
		next(error);
	}
};

//residents
export const getResidents = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { limit, page } = req.query;
		const data: any = {};
		if (limit) {
			data.limit = Number(limit);
		}
		if (page) {
			data.offset = (Number(page) - 1) * Number(limit);
		}
		const residents = await managerServices.getResidents(data);
		return res.status(200).json(
			new DataResponse(
				0,
				{
					residents: residents.rows,
					count: residents.count,
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
export const getResident = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = Number(req.params.id);
		const resident = await managerServices.getResident(id);
		return res.status(200).json(new DataResponse(0, resident, 'OK'));
	} catch (error) {
		next(error);
	}
};

export const addResident = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const {
			householdId,
			fullName,
			dateOfBirth,
			gender,
			identityNumber,
			relationship,
		} = req.body;
		const resident = await managerServices.addResident(
			householdId,
			fullName,
			dateOfBirth,
			gender,
			identityNumber,
			relationship,
		);
		return res
			.status(RESPONSE_SUCCESS)
			.json(new DataResponse(0, resident, 'OK'));
	} catch (error) {
		next(error);
	}
};

export const updateResident = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = Number(req.params.id);
		const {
			householdId,
			fullName,
			dateOfBirth,
			gender,
			identityNumber,
			relationship,
		} = req.body;
		const resident = await managerServices.updateResident(
			id,
			householdId,
			fullName,
			dateOfBirth,
			gender,
			identityNumber,
			relationship,
		);
		return res
			.status(RESPONSE_SUCCESS)
			.json(new DataResponse(0, resident, 'OK'));
	} catch (error) {
		next(error);
	}
};

export const deleteResident = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = Number(req.params.id);
		const resident = await managerServices.deleteResident(id);
		return res
			.status(RESPONSE_SUCCESS)
			.json(new DataResponse(0, resident, 'OK'));
	} catch (error) {
		next(error);
	}
};

//voluntary contributions

export const addVoluntaryContribution = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { residentId, description, amout, date } = req.body;
		const contribution = await managerServices.addVoluntaryContribution(
			residentId,
			description,
			amout,
			date,
		);
		return res
			.status(RESPONSE_SUCCESS)
			.json(new DataResponse(0, contribution, 'OK'));
	} catch (error) {
		next(error);
	}
};

export const updateVoluntaryContribution = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = Number(req.params.id);
		const { residentId, description, amout, date } = req.body;
		const contribution = await managerServices.updateVoluntaryContribution(
			id,
			residentId,
			description,
			amout,
			date,
		);
		return res
			.status(RESPONSE_SUCCESS)
			.json(new DataResponse(0, contribution, 'OK'));
	} catch (error) {
		next(error);
	}
};

export const deleteVoluntaryContribution = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = Number(req.params.id);
		const contribution = await managerServices.deleteVoluntaryContribution(
			id,
		);
		return res
			.status(RESPONSE_SUCCESS)
			.json(new DataResponse(0, contribution, 'OK'));
	} catch (error) {
		next(error);
	}
};
