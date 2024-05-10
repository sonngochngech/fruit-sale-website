'use strict';
const { DataTypes } = require('sequelize');
const { defaultValueSchemable } = require('sequelize/lib/utils');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Fruits', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true 
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      rating: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      peopleRated: {
        type: Sequelize.INTEGER,
        defaultValue:0
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      sales: {
        type: Sequelize.INTEGER,
        defaultValue:0
      },
      isDeleted: {
        type: Sequelize.INTEGER,
        defaultValue:0
      },
      deletedAt:{
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Fruits');
  }
};
