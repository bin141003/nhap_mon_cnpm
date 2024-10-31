'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('vehicle_details', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			householdId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'households',
					key: 'id',
				},
			},
			registrationNumber: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			vehicleTypeId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'vehicle_types',
					key: 'id',
				},
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('vehicle_details');
	},
};
