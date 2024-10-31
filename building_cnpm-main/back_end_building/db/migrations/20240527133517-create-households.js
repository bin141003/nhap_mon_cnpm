'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('households', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			houseNumber: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			address: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			totalArea: {
				type: Sequelize.FLOAT,
				allowNull: false,
				defaultValue: 0,
			},
			phoneNumber: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
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
		await queryInterface.dropTable('households');
	},
};
