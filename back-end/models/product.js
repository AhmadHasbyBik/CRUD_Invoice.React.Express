// models/product.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('widatech-test', 'root', '', {
  dialect: 'mysql',
  host: 'localhost'
});

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Product;
