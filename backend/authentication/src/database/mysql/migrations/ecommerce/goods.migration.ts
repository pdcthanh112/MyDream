"use strict";
const goodsMigration = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Goods", {
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
    await queryInterface.dropTable("Goods");
  },
};

export default goodsMigration;
