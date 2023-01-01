import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Book } from '@/interfaces/books.interface';

export type CreationAttributes = Optional<Book, 'id'>;

export class BookModel extends Model<Book, CreationAttributes> implements Book {
  id: string;
  book_name: string;
  category: string;
  sub_catetory: string;
  author: string;
  quantity: number;
  price: number;
  series: string;
  publisher: string;
  country: string;
  sold: number;
  rating: number;
  image: string;
  status: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof BookModel {
  BookModel.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
      },
      book_name: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      category: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      sub_catetory: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
      author: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
      quantity: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      price: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      series: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
      publisher: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
      country: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
      sold: {
        allowNull: true,
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      rating: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      image: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      status: {
        allowNull: false,
        type: DataTypes.STRING(45),
      }
    },
    {
      tableName: 'books',
      sequelize,
    },
  );

  return BookModel;
}
