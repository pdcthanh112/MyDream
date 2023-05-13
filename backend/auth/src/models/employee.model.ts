import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Employee } from '@interfaces/account.interface';

//export type UserCreationAttributes = Optional<Employee | 'id' | 'email' | 'password'>;

export class EmployeeModel extends Model<Employee> implements Employee{
  public id: number;
  public email: string;
  public password: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof EmployeeModel {
  EmployeeModel.init(
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
      tableName: 'Employee',
      sequelize,
    },
  );

  return EmployeeModel;
}
