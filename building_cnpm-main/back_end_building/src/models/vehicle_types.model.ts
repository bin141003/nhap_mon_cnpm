import {
	CreationOptional,
	InferAttributes,
	InferCreationAttributes,
	Model,
	Sequelize,
	DataTypes,
} from 'sequelize';

export class Vehicle_types extends Model<
	InferAttributes<Vehicle_types>,
	InferCreationAttributes<Vehicle_types>
> {
	declare id: CreationOptional<number>;
	declare name: string;
	declare monthlyFee: number;
	declare createdAt: CreationOptional<Date>;
	declare updatedAt: CreationOptional<Date>;

	static initClass = (sequelize: Sequelize) => {
		Vehicle_types.init(
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
					autoIncrement: true,
				},
				name: {
					type: DataTypes.STRING,
					allowNull: false,
					unique: true,
				},
				monthlyFee: {
					type: DataTypes.FLOAT,
					allowNull: false,
				},
				createdAt: DataTypes.DATE,
				updatedAt: DataTypes.DATE,
			},
			{
				sequelize,
				tableName: 'vehicle_types',
				timestamps: true,
				createdAt: 'createdAt',
				updatedAt: 'updatedAt',
				name: {
					singular: 'vehicle_type',
					plural: 'vehicle_types',
				},
			},
		);
	};
}
