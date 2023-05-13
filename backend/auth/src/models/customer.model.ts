import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Customer } from '@interfaces/account.interface';

//export type UserCreationAttributes = Optional<Customer | 'id' | 'email' | 'password'>;

export class CustomerModel extends Model<Customer> implements Customer{
  public id: number;
  public email: string;
  public password: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof CustomerModel {
  CustomerModel.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
    },
    {
      tableName: 'Customer',
      sequelize,
    },
  );

  return CustomerModel;
}
