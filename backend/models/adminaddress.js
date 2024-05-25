'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AdminAddress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AdminAddress.belongsTo(models.User);
    }
  } 
  AdminAddress.init({
    paymentAddress: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AdminAddress',
  });
  return AdminAddress;
};