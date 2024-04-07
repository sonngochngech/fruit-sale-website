'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Order);
      User.belongsToMany(models.Fruit,{through:'shopping_carts'})
    }
  }
  User.init({
    username: DataTypes.STRING,
    firstName:          DataTypes.STRING,
      lastName:           DataTypes.STRING,
      profileImage:       DataTypes.STRING,
      email: {
        type:             DataTypes.STRING,
        unique:           true,
        allowNull:        false
      },
      
      phoneNo:            DataTypes.STRING,
      password:           DataTypes.STRING,
      role:           DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  
  User.sync({alter: false})
  return User;
};