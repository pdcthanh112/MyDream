"use strict";
const categoryMigration = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Category", {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(45),
      },
      enValue: {
        type: Sequelize.STRING(45),
      },
      viValue: {
        type: Sequelize.STRING(45),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Category");
  },
};

export default categoryMigration;
// "use strict";
// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     await queryInterface.createTable("Category", {
//       id: {
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER,
//         allowNull: false
//       },
//       name: {
//         type: Sequelize.STRING,
//       },
//     });
//   },
//   down: async (queryInterface, Sequelize) => {
//     await queryInterface.dropTable("Category");
//   },
// };
