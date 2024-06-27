// models/product.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('widatech-test', 'root', '', {
  dialect: 'mysql',
  host: 'localhost'
});

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.FLOAT,
  },
  stock: {
    type: DataTypes.INTEGER,
  },
  category: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

Product.associate = (models) => {
  Product.hasMany(models.ProductSold, { foreignKey: 'ProductId' });
};

module.exports = Product;
