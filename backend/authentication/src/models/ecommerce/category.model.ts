import { Sequelize, DataTypes, Model } from 'sequelize';
import { Category } from '@interfaces/ecommerce/category.interface';

export class CategoryModel extends Model<Category> implements Category {
  public id: number;
  public name: string;
  public enValue: string;
  public viValue: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof CategoryModel {
  CategoryModel.init(
    {
      id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      enValue: DataTypes.STRING,
      viValue: DataTypes.STRING,
    },
    {
      tableName: 'Categories',
      sequelize,
    },
  );

  return CategoryModel;
}
