import {
	CreationOptional,
	InferAttributes,
	InferCreationAttributes,
	Model,
	Sequelize,
	DataTypes,
} from 'sequelize';

export class Fee_details extends Model<
	InferAttributes<Fee_details>,
	InferCreationAttributes<Fee_details>
> {
	declare id: CreationOptional<number>;
	declare householdId: number;
	declare feeId: number;
	declare quantity: number;
	declare dueDate: Date;
	declare status: string;
	declare createdAt: CreationOptional<Date>;
	declare updatedAt: CreationOptional<Date>;

	static initClass = (sequelize: Sequelize) => {
		Fee_details.init(
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
				feeId: {
					type: DataTypes.INTEGER,
					allowNull: false,
				},
				quantity: {
					type: DataTypes.FLOAT,
					allowNull: false,
				},
				dueDate: {
					type: DataTypes.DATE,
					allowNull: false,
				},
				status: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				createdAt: DataTypes.DATE,
				updatedAt: DataTypes.DATE,
			},
			{
				sequelize,
				tableName: 'fee_details',
				timestamps: true,
				createdAt: 'createdAt',
				updatedAt: 'updatedAt',
				name: {
					singular: 'fee_detail',
					plural: 'fee_details',
				},
			},
		);
	};
}
