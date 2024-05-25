'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PaymentHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PaymentHistory.belongsTo(models.Order);
    }
  }
  PaymentHistory.init({
    sender: DataTypes.STRING,
    recipient: DataTypes.STRING,
    hash: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PaymentHistory',
  });
  return PaymentHistory;
};