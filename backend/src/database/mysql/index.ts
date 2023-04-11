import Sequelize from 'sequelize';
import { NODE_ENV, MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } from '@config';
import UserModel from '@models/users.model';
import { logger } from '@utils/logger';

export const mysqlConnection = new Sequelize.Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, {
  dialect: 'mysql',
  host: MYSQL_HOST,
  port: Number(MYSQL_PORT),
  timezone: '+07:00',
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    underscored: true,
    freezeTableName: true,
  },
  pool: {
    min: 0,
    max: 5,
  },
  logQueryParameters: NODE_ENV === 'development',
  logging: (query, time) => {
    logger.info(time + 'ms' + ' ' + query);
  },
  benchmark: true,
});

// export const DB = {
//   Users: UserModel(sequelize),
//   sequelize, // connection instance (RAW queries)
//   Sequelize, // library
// };
