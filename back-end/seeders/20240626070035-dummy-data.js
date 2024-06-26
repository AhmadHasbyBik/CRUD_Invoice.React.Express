'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Products', [
      { name: 'Laptop', price: 1200, stock: 100, category: 'Electronics', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Smartphone', price: 800, stock: 100, category: 'Electronics', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Tablet', price: 500, stock: 100, category: 'Electronics', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Desktop PC', price: 1500, stock: 100, category: 'Electronics', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Headphones', price: 100, stock: 100, category: 'Electronics', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Smartwatch', price: 300, stock: 100, category: 'Electronics', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Camera', price: 700, stock: 100, category: 'Electronics', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Printer', price: 400, stock: 100, category: 'Electronics', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Monitor', price: 600, stock: 100, category: 'Electronics', createdAt: new Date(), updatedAt: new Date() },
      { name: 'External Hard Drive', price: 200, stock: 100, category: 'Electronics', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Keyboard', price: 80, stock: 100, category: 'Electronics', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Mouse', price: 50, stock: 100, category: 'Electronics', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Router', price: 120, stock: 100, category: 'Electronics', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Speaker System', price: 300, stock: 100, category: 'Electronics', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Gaming Console', price: 400, stock: 100, category: 'Electronics', createdAt: new Date(), updatedAt: new Date() },
      { name: 'T-shirt', price: 20, stock: 100, category: 'Apparel', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Jeans', price: 50, stock: 100, category: 'Apparel', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Running Shoes', price: 80, stock: 100, category: 'Footwear', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Backpack', price: 60, stock: 100, category: 'Accessories', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Watch', price: 150, stock: 100, category: 'Accessories', createdAt: new Date(), updatedAt: new Date() },
    ], {});    

    await queryInterface.bulkInsert('Invoices', [
      { date: new Date(), customer: 'John Doe', salesperson: 'Jane Smith', paymentType: 'Credit Card', notes: 'Invoice notes', createdAt: new Date(), updatedAt: new Date() },
      // tambahkan invoice lain sesuai kebutuhan
    ], {});

    await queryInterface.bulkInsert('ProductSolds', [
      { item: 'Laptop', quantity: 1, totalCogs: 1000, totalPrice: 1200, createdAt: new Date(), updatedAt: new Date() },
      // tambahkan product sold lain sesuai kebutuhan
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
    await queryInterface.bulkDelete('Invoices', null, {});
    await queryInterface.bulkDelete('ProductSolds', null, {});
  }
};
