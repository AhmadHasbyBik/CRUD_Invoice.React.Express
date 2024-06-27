'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Products', [
      { name: 'Laptop', price: 1200, stock: 100, category: 'Electronics', image: 'laptop.jpeg', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Smartphone', price: 800, stock: 100, category: 'Electronics', image: 'smartphone.jpeg', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Tablet', price: 500, stock: 100, category: 'Electronics', image: 'tablet.jpg', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Desktop PC', price: 1500, stock: 100, category: 'Electronics', image: 'pc.jpg', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Smartwatch', price: 300, stock: 100, category: 'Electronics', image: 'smartwatch.jpg', createdAt: new Date(), updatedAt: new Date() },
    ], {});    

    await queryInterface.bulkInsert('Invoices', [
      { date: new Date(), customer: 'John Doe', salesperson: 'Jane Smith', paymentType: 'Credit Card', notes: 'Invoice notes', createdAt: new Date(), updatedAt: new Date() },
      // tambahkan invoice lain sesuai kebutuhan
    ], {});

    await queryInterface.bulkInsert('ProductSolds', [
      { productId:1, item: 'Laptop', quantity: 1, totalCogs: 1000, totalPrice: 1200, createdAt: new Date(), updatedAt: new Date() },
      // tambahkan product sold lain sesuai kebutuhan
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
    await queryInterface.bulkDelete('Invoices', null, {});
    await queryInterface.bulkDelete('ProductSolds', null, {});
  }
};
