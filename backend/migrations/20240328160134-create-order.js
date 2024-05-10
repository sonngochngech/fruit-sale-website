'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      code: {
        allowNull: false,
        type: Sequelize.INTEGER,
        unique:true
      },
      phoneNo: {
        type: Sequelize.STRING,
        allowNull:false
      },
      title: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        allowNull:false
      },
      address: {
        type: Sequelize.STRING,
        allowNull:false
      },
      status: {
        type: Sequelize.STRING,
        allowNull:false,
        defaultValue: "REQUEST"
      },
      productCost: {
        type: Sequelize.INTEGER,
        allowNull:false,
        defaultValue: 0
      },
      shippingCost: {
        type: Sequelize.INTEGER,
        allowNull:false,
        defaultValue: 0
      },
      userId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },  
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable('Orders');
  }
};