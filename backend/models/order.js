'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.User);
      Order.belongsToMany(models.Fruit, { through: models.OrderItem });
    
    }
  }
  Order.init({
    title:              DataTypes.STRING,
    phoneNo:            DataTypes.STRING,
    email:              DataTypes.STRING,
    address:            DataTypes.STRING,
    status:{
      type: DataTypes.STRING,
      defaultValue: "Request"
    },
    productCost:        DataTypes.INTEGER,
    shippingCost:       DataTypes.INTEGER,
    
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};