import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Candidate } from '@interfaces/account.interface';

//export type UserCreationAttributes = Optional<Candidate | 'id' | 'email' | 'password'>;

export class CandidateModel extends Model<Candidate> implements Candidate{
  public id: number;
  public email: string;
  public password: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof CandidateModel {
  CandidateModel.init(
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
      tableName: 'Candidate',
      sequelize,
    },
  );

  return CandidateModel;
}
