import {
	CreationOptional,
	InferAttributes,
	InferCreationAttributes,
	Model,
	Sequelize,
	DataTypes,
	Optional,
} from 'sequelize';

export class Residents extends Model<
	InferAttributes<Residents>,
	InferCreationAttributes<Residents>
> {
	declare id: CreationOptional<number>;
	declare householdId: number;
	declare fullName: string;
	declare dateOfBirth: Date;
	declare gender: string;
	declare identityNumber: string;
	declare relationship: string;
	declare createdAt: CreationOptional<Date>;
	declare updatedAt: CreationOptional<Date>;

	static initClass = (sequelize: Sequelize) => {
		Residents.init(
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
				fullName: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				dateOfBirth: {
					type: DataTypes.DATE,
					allowNull: false,
				},
				gender: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				identityNumber: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				relationship: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				createdAt: DataTypes.DATE,
				updatedAt: DataTypes.DATE,
			},
			{
				sequelize,
				tableName: 'residents',
				timestamps: true,
				createdAt: 'createdAt',
				updatedAt: 'updatedAt',
				name: {
					singular: 'resident',
					plural: 'residents',
				},
			},
		);
	};
}
