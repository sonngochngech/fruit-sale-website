'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ShoppingCarts', {
      amount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      userId:{
        type:Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      fruitId:{
        type:Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true

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
    await queryInterface.dropTable('ShoppingCarts');
  }
};