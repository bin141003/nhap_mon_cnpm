'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('voluntary_contributions', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			residentId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'residents',
					key: 'id',
				},
				allowNull: false,
			},
			description: {
				type: Sequelize.STRING,
			},
			amout: {
				type: Sequelize.FLOAT,
				allowNull: false,
				defaultValue: 0,
			},
			date: {
				type: Sequelize.DATE,
				allowNull: false,
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
		await queryInterface.dropTable('voluntary_contributions');
	},
};
