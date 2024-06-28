// models/invoice.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('widatech-test', 'root', '', {
  dialect: 'mysql',
  host: 'localhost'
});

const Invoice = sequelize.define('Invoice', {
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  customer: {
    type: DataTypes.STRING,
    allowNull: false
  },
  salesperson: {
    type: DataTypes.STRING,
    allowNull: false
  },
  paymentType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  notes: {
    type: DataTypes.TEXT
  },
  ProductSoldId: {
    type: DataTypes.INTEGER,
  }
});

Invoice.associate = (models) => {
  Invoice.belongsTo(models.ProductSold, { foreignKey: 'ProductSoldId' });
};

module.exports = Invoice;
