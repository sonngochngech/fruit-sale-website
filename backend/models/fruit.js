'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fruit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Fruit.belongsTo(models.Category);
      Fruit.hasMany(models.FruitImage);
      Fruit.belongsToMany(models.User,{through:'shopping_cart'})
      Fruit.belongsToMany(models.Order, { through: models.OrderItem });
    }
  }
  Fruit.init({
      code: {
        type: DataTypes.STRING,
        unique: true
      },
      title:            DataTypes.STRING,
      description:      DataTypes.TEXT,
      amount:           DataTypes.INTEGER,
      rating:           DataTypes.FLOAT,
      peopleRated:      DataTypes.INTEGER,
      price:            DataTypes.INTEGER,
      sales:            DataTypes.INTEGER,
      isDeleted:        DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Fruit',
  });

  
  Fruit.sync({alter: false})
  return Fruit;
};