import {
	CreationOptional,
	InferAttributes,
	InferCreationAttributes,
	Model,
	Sequelize,
	DataTypes,
	Optional,
} from 'sequelize';

export class Households extends Model<
	InferAttributes<Households>,
	InferCreationAttributes<Households>
> {
	declare id: CreationOptional<number>;
	declare houseNumber: string;
	declare address: string;
	declare totalArea: number;
	declare phoneNumber: string;
	declare createdAt: CreationOptional<Date>;
	declare updatedAt: CreationOptional<Date>;

	static initClass = (sequelize: Sequelize) => {
		Households.init(
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
					autoIncrement: true,
				},
				houseNumber: {
					type: DataTypes.STRING,
					allowNull: false,
					unique: true,
				},
				address: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				totalArea: {
					type: DataTypes.FLOAT,
					allowNull: false,
				},
				phoneNumber: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				createdAt: DataTypes.DATE,
				updatedAt: DataTypes.DATE,
			},
			{
				sequelize,
				tableName: 'households',
				timestamps: true,
				createdAt: 'createdAt',
				updatedAt: 'updatedAt',
				name: {
					singular: 'household',
					plural: 'households',
				},
			},
		);
	};
}
