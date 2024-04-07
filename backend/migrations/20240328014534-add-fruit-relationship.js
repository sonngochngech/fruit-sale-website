'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return await queryInterface.addColumn(
      'Fruits',
      'categoryId',
      {
        type:Sequelize.INTEGER,
        references: {
          model: 'Categories',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }
    ).then(async ()=>{
      return  await queryInterface.addColumn(
        'FruitImages',
        'fruitId',
        {
          type:Sequelize.INTEGER,
          references: {
            model: 'Fruits',
            key: 'id'
          },
          onUpdate:'CASCADE',
          onDelete: 'CASCADE'
  
        }
      )
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return await queryInterface.removeColumn(
      'Fruits',
      'categoryId'
    ).then(async()=>{
      queryInterface.removeColumn(
        'FruitImages',
        'fruitId',
      )
    })
  }
};
