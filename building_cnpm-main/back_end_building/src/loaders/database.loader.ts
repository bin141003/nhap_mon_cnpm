import { Sequelize, Dialect } from 'sequelize';
import { Users } from '../models/users.model';
import env from '../../env';
import { Fee_details } from '../models/fee_details.model';
import { Fees } from '../models/fees.model';
import { Households } from '../models/households.model';
import { Residents } from '../models/residents.model';
import { Vehicle_details } from '../models/vehicle_details.model';
import { Vehicle_types } from '../models/vehicle_types.model';
import { Voluntary_contributions } from '../models/voluntary_contributions.model';

const dbConfig = env.database;

const sequelize = new Sequelize(
	dbConfig.name,
	dbConfig.username,
	dbConfig.password,
	{
		host: dbConfig.host,
		dialect: dbConfig.dialect as Dialect,
		port: dbConfig.port,
		pool: {
			max: dbConfig.max,
			min: dbConfig.min,
			acquire: dbConfig.acquire,
			idle: dbConfig.idle,
		},
		logging: dbConfig.logging,
	},
);

const connectToDatabase = async () => {
	try {
		await sequelize.authenticate();
		// if (dbConfig.isSync) await sequelize.sync({ alter: true });
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
};

Users.initClass(sequelize);
Fee_details.initClass(sequelize);
Fees.initClass(sequelize);
Households.initClass(sequelize);
Residents.initClass(sequelize);
Vehicle_details.initClass(sequelize);
Vehicle_types.initClass(sequelize);
Voluntary_contributions.initClass(sequelize);

Fees.hasMany(Fee_details);

Fee_details.belongsTo(Fees);

Households.hasMany(Fee_details);

Fee_details.belongsTo(Households);

Households.hasMany(Residents);

Residents.belongsTo(Households);

Households.hasMany(Vehicle_details);

Vehicle_details.belongsTo(Households);

Vehicle_types.hasMany(Vehicle_details);

Vehicle_details.belongsTo(Vehicle_types, { foreignKey: 'vehicleTypeId' });

Residents.hasMany(Voluntary_contributions);

Voluntary_contributions.belongsTo(Residents);

export const db = {
	sequelize: sequelize,
	users: Users,
	feeDetails: Fee_details,
	fees: Fees,
	households: Households,
	residents: Residents,
	vehicleDetails: Vehicle_details,
	vehicleTypes: Vehicle_types,
	voluntaryContributions: Voluntary_contributions,
	connectToDatabase,
};
