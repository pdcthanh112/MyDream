import { Sequelize, DataTypes, Model } from 'sequelize';
import { Goods } from '@interfaces/ecommerce/goods.interface';

export class GoodsModel extends Model<Goods> implements Goods {
  public id: number;
  public name: string;
  public enValue: string;
  public viValue: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof GoodsModel {
  GoodsModel.init(
    {
      id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      enValue: DataTypes.STRING,
      viValue: DataTypes.STRING,
    },
    {
      tableName: 'Goods',
      sequelize,
    },
  );

  return GoodsModel;
}
