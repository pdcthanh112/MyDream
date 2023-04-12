import { Sequelize, DataTypes, Model } from 'sequelize';
import { Subcategory } from '@interfaces/ecommerce/subcategory.interface';

export class SubcategoryModel extends Model<Subcategory> implements Subcategory {
  public id: number;
  public name: string;
  public enValue: string;
  public viValue: string;
  public category: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof SubcategoryModel {
    SubcategoryModel.init(
    {
      id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      enValue: DataTypes.STRING,
      viValue: DataTypes.STRING,
      category: DataTypes.INTEGER
    },
    {
      tableName: 'Sub_Categories',
      sequelize,
    },
  );

  return SubcategoryModel;
}
