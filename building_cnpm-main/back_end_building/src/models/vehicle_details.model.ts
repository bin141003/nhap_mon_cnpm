import {
	CreationOptional,
	InferAttributes,
	InferCreationAttributes,
	Model,
	Sequelize,
	DataTypes,
} from 'sequelize';

export class Vehicle_details extends Model<
	InferAttributes<Vehicle_details>,
	InferCreationAttributes<Vehicle_details>
> {
	declare id: CreationOptional<number>;
	declare householdId: number;
	declare vehicleTypeId: number;
	declare registrationNumber: string;
	declare createdAt: CreationOptional<Date>;
	declare updatedAt: CreationOptional<Date>;

	static initClass = (sequelize: Sequelize) => {
		Vehicle_details.init(
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
					autoIncrement: true,
				},
				householdId: {
					type: DataTypes.INTEGER,
					allowNull: false,
				},
				vehicleTypeId: {
					type: DataTypes.INTEGER,
					allowNull: false,
				},
				registrationNumber: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				createdAt: DataTypes.DATE,
				updatedAt: DataTypes.DATE,
			},
			{
				sequelize,
				tableName: 'vehicle_details',
				timestamps: true,
				createdAt: 'createdAt',
				updatedAt: 'updatedAt',
				name: {
					singular: 'vehicle_detail',
					plural: 'vehicle_details',
				},
			},
		);
	};
}
