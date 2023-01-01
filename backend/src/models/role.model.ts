import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Role } from '@interfaces/role.interface';

export type CreationAttributes = Optional<Role, 'id'>;

export class RoleModel extends Model<Role, CreationAttributes> implements Role {
  public id: number;
  public role: string;
}

export default function (sequelize: Sequelize): typeof RoleModel {
  RoleModel.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
      },
      role: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
    },
    {
      tableName: 'role',
      sequelize,
    },
  );

  return RoleModel;
}
