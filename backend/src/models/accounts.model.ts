import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Account } from '@interfaces/accounts.interface';

export type AccountCreationAttributes = Optional<Account, 'id' | 'email' | 'password'>;

export class AccountModel extends Model<Account, AccountCreationAttributes> implements Account {
  public id: string;
  public email: string;
  public password: string;
  notificationToken: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof AccountModel {
  AccountModel.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(45), 

      },
      password: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      notificationToken: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
    },
    {
      tableName: 'accounts',
      sequelize,
    },
  );

  return AccountModel;
}
