'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('residents', {
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
			fullName: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			dateOfBirth: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			gender: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			identityNumber: {
				type: Sequelize.STRING,
			},
			relationship: {
				type: Sequelize.STRING,
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
		await queryInterface.dropTable('residents');
	},
};
