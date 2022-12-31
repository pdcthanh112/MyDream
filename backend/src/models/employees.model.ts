import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Employee } from '@interfaces/employee.interface';

export type CreationAttributes = Optional<Employee, 'id'>;

export class EmployeeModel extends Model<Employee, CreationAttributes> implements Employee {
  public id: string;
  public accountId: string;
  public employeeCode: string;
  public surName: string;
  public middleName: string;
  public givenName: string;
  public dateOfBirth: Date;
  public departmentId: number;
  public positionId: number;
  public phoneNumber: string;
  public address: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof EmployeeModel {
  EmployeeModel.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
      },
      accountId: {
        allowNull: false,
        type: DataTypes.STRING(32),
      },
      employeeCode: {
        allowNull: false,
        type: DataTypes.STRING(10),
      },
      surName: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      middleName: {
        allowNull: true,
        type: DataTypes.STRING(255),
      },
      givenName: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      dateOfBirth: {
        allowNull: true,
        type: DataTypes.DATEONLY,
      },
      departmentId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      positionId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      phoneNumber: {
        allowNull: true,
        type: DataTypes.STRING(255),
      },
      address: {
        allowNull: true,
        type: DataTypes.STRING(255),
      }
    },
    {
      tableName: 'employees',
      sequelize,
    },
  );

  return EmployeeModel;
}
