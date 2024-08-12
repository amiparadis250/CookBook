import { Model, DataTypes } from 'sequelize';
 import { sequelizeConnection } from '../database/config/database.config';

class Ingredient extends Model {
  public id!: string;
  public name!: string;
  public slug!: string;
  public description?: string;
  public foodGroup?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Ingredient.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    foodGroup: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize:sequelizeConnection,
    modelName: 'Ingredient',
    tableName: 'ingredients',
    timestamps: true,
  }
);

export default Ingredient;
