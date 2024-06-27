// models/productsold.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('widatech-test', 'root', '', {
  dialect: 'mysql',
  host: 'localhost'
});

const ProductSold = sequelize.define('ProductSold', {
  item: {
    type: DataTypes.STRING,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  totalCogs: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  ProductId: DataTypes.INTEGER,
});

ProductSold.associate = (models) => {
  ProductSold.belongsTo(models.Product, { foreignKey: 'ProductId' });
};

module.exports = ProductSold;
