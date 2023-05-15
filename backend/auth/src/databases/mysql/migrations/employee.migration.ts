'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Employee', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
          },
          email: {
            allowNull: false,
            type: Sequelize.STRING(45),
          },
          password: {
            allowNull: false,
            type: Sequelize.STRING(255),
          },
          accountId: {
            allowNull: false,
            unique: true,
            type: Sequelize.STRING(45),
          },
          empAccount: {
            allowNull: false,
            unique: true,
            type: Sequelize.STRING(45),
          },
          name: {
            allowNull: false,
            type: Sequelize.STRING(45),
          },
          phone: {
            allowNull: false,
            type: Sequelize.STRING(20),
          },
          address: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          department: {
            allowNull: false,
            type: Sequelize.STRING(45),
          },
          dob: {
            type: Sequelize.DATEONLY,
          },
          gender: {
            allowNull: false,
            type: Sequelize.STRING(10),
          },
          image: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          salary: {
            allowNull: false,
            type: Sequelize.NUMBER,
          }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Employee');
  }
};