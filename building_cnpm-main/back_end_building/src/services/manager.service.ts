import { Vehicle_types } from '../models/vehicle_types.model';
import { db } from '../loaders/database.loader';
import { Fees } from '../models/fees.model';
import { Households } from '../models/households.model';

//household
export const addHousehold = async (
	houseNumber: string,
	address: string,
	totalArea: number,
	phoneNumber: string,
) => {
	const newHousehold = await db.households.create({
		houseNumber,
		address,
		totalArea,
		phoneNumber,
	});
	return newHousehold;
};

export const getHouseholds = async (data: any) => {
	const households = await db.households.findAndCountAll(data);
	return households;
};

export const updateHousehold = async (
	id: number,
	houseNumber: string,
	address: string,
	totalArea: number,
	phoneNumber: string,
) => {
	const updatedHousehold = await db.households.update(
		{
			houseNumber,
			address,
			totalArea,
			phoneNumber,
		},
		{
			where: {
				id,
			},
		},
	);
	return updatedHousehold;
};

export const deleteHousehold = async (id: number) => {
	const deletedHousehold = await db.households.destroy({
		where: {
			id,
		},
	});
	return deletedHousehold;
};

//fee details
export const getFeeDetails = async (data: any) => {
	const feeDetails = await db.feeDetails.findAndCountAll({
		...data,
		include: [
			Fees,
			{
				model: Households,
				attributes: ['houseNumber', 'address'],
			},
		],
		order: [['householdId', 'DESC']],
	});
	return feeDetails;
};

export const getFeeDetail = async (id: number) => {
	const feeDetail = await db.feeDetails.findOne({
		where: {
			id,
		},
	});
	return feeDetail;
};
export const addFeeDetail = async (
	householdId: number,
	feeId: number,
	quantity: number,
	dueDate: Date,
	status: string,
) => {
	const newFeeDetail = await db.feeDetails.create({
		householdId,
		feeId,
		quantity,
		dueDate,
		status,
	});
	return newFeeDetail;
};

export const updateFeeDetail = async (
	id: number,
	householdId: number,
	feeId: number,
	quantity: number,
	dueDate: Date,
	status: string,
) => {
	const updatedFeeDetail = await db.feeDetails.update(
		{
			householdId,
			feeId,
			quantity,
			dueDate,
			status,
		},
		{
			where: {
				id,
			},
		},
	);
	return updatedFeeDetail;
};

export const deleteFeeDetail = async (id: number) => {
	const deletedFeeDetail = await db.feeDetails.destroy({
		where: {
			id,
		},
	});
	return deletedFeeDetail;
};

//vehicle details
export const getVehicleDetails = async (data: any) => {
	const vehicleDetails = await db.vehicleDetails.findAndCountAll({
		...data,
		include: [
			Vehicle_types,
			{
				model: Households,
				attributes: ['houseNumber', 'address'],
			},
		],
	});
	return vehicleDetails;
};

export const getVehicleDetail = async (id: number) => {
	const vehicleDetail = await db.vehicleDetails.findOne({
		where: {
			id,
		},
	});
	return vehicleDetail;
};

export const addVehicleDetail = async (
	householdId: number,
	vehicleTypeId: number,
	registrationNumber: string,
) => {
	const newVehicleDetail = await db.vehicleDetails.create({
		householdId,
		vehicleTypeId,
		registrationNumber,
	});
	return newVehicleDetail;
};

export const updateVehicleDetail = async (
	id: number,
	householdId: number,
	vehicleTypeId: number,
	registrationNumber: string,
) => {
	const updatedVehicleDetail = await db.vehicleDetails.update(
		{
			householdId,
			vehicleTypeId,
			registrationNumber,
		},
		{
			where: {
				id,
			},
		},
	);
	return updatedVehicleDetail;
};

export const deleteVehicleDetail = async (id: number) => {
	const deletedVehicleDetail = await db.vehicleDetails.destroy({
		where: {
			id,
		},
	});
	return deletedVehicleDetail;
};
//resident
export const getResidents = (data: any) => {
	const residents = db.residents.findAndCountAll(data);
	return residents;
};
export const getResident = async (id: number) => {
	const resident = await db.residents.findOne({
		where: {
			id,
		},
	});
	return resident;
};

export const addResident = async (
	householdId: number,
	fullName: string,
	dateOfBirth: Date,
	gender: string,
	identityNumber: string,
	relationship: string,
) => {
	const newResident = await db.residents.create({
		householdId,
		fullName,
		dateOfBirth,
		gender,
		identityNumber,
		relationship,
	});
	return newResident;
};

export const updateResident = async (
	id: number,
	householdId: number,
	fullName: string,
	dateOfBirth: Date,
	gender: string,
	identityNumber: string,
	relationship: string,
) => {
	const updatedResident = await db.residents.update(
		{
			householdId,
			fullName,
			dateOfBirth,
			gender,
			identityNumber,
			relationship,
		},
		{
			where: {
				id,
			},
		},
	);
	return updatedResident;
};

export const deleteResident = async (id: number) => {
	const deletedResident = await db.residents.destroy({
		where: {
			id,
		},
	});
	return deletedResident;
};

//voluntary contribution
export const addVoluntaryContribution = async (
	residentId: number,
	description: string,
	amout: number,
	date: Date,
) => {
	const newVoluntaryContribution = await db.voluntaryContributions.create({
		residentId,
		description,
		amout,
		date,
	});
	return newVoluntaryContribution;
};

export const updateVoluntaryContribution = async (
	id: number,
	residentId: number,
	description: string,
	amout: number,
	date: Date,
) => {
	const updatedVoluntaryContribution = await db.voluntaryContributions.update(
		{
			residentId,
			description,
			amout,
			date,
		},
		{
			where: {
				id,
			},
		},
	);
	return updatedVoluntaryContribution;
};

export const deleteVoluntaryContribution = async (id: number) => {
	const deletedVoluntaryContribution =
		await db.voluntaryContributions.destroy({
			where: {
				id,
			},
		});
	return deletedVoluntaryContribution;
};
