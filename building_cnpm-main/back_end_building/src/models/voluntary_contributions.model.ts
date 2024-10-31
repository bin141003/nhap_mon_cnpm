import {
	CreationOptional,
	InferAttributes,
	InferCreationAttributes,
	Model,
	Sequelize,
	DataTypes,
	Optional,
} from 'sequelize';

export class Voluntary_contributions extends Model<
	InferAttributes<Voluntary_contributions>,
	InferCreationAttributes<Voluntary_contributions>
> {
	declare id: CreationOptional<number>;
	declare residentId: number;
	declare description: string;
	declare amout: number;
	declare date: Date;
	declare createdAt: CreationOptional<Date>;
	declare updatedAt: CreationOptional<Date>;

	static initClass = (sequelize: Sequelize) => {
		Voluntary_contributions.init(
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
					autoIncrement: true,
				},
				residentId: {
					type: DataTypes.INTEGER,
					allowNull: false,
				},
				description: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				amout: {
					type: DataTypes.FLOAT,
					allowNull: false,
				},
				date: {
					type: DataTypes.DATE,
					allowNull: false,
				},
				createdAt: DataTypes.DATE,
				updatedAt: DataTypes.DATE,
			},
			{
				sequelize,
				tableName: 'voluntary_contributions',
				timestamps: true,
				createdAt: 'createdAt',
				updatedAt: 'updatedAt',
				name: {
					singular: 'voluntary_contribution',
					plural: 'voluntary_contributions',
				},
			},
		);
	};
}
