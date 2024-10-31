'use strict';
/** @type {import('sequelize-cli').Migration} */
const bcrypt = require('bcryptjs');
module.exports = {
	async up(queryInterface, Sequelize) {
		const date = new Date();
		const hash = await bcrypt.hash('admin123456', 10);
		await queryInterface.bulkInsert(
			'users',
			[
				{
					name: 'Admin',
					email: 'admin@gmail.com',
					password: hash,
					role: 1,
					createdAt: date,
					updatedAt: date,
				},
			],
			{},
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete(
			'users',
			{ email: 'admin@gmail.com' },
			{},
		);
	},
};
