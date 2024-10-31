'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('fee_details', {
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
			feeId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'fees',
					key: 'id',
				},
			},
			quantity: {
				type: Sequelize.FLOAT,
				allowNull: false,
				defaultValue: 0,
			},
			dueDate: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			status: {
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: 'pending',
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
		await queryInterface.dropTable('fee_details');
	},
};
