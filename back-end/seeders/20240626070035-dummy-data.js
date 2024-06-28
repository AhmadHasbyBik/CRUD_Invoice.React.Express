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

    await queryInterface.bulkInsert('ProductSolds', [
      { productId: 1, item: 'Laptop', quantity: 1, totalCogs: 1000, totalPrice: 1200, createdAt: new Date(), updatedAt: new Date() },
      { productId: 2, item: 'Smartphone', quantity: 2, totalCogs: 20, totalPrice: 30, createdAt: new Date(), updatedAt: new Date() },
      { productId: 3, item: 'Tablet', quantity: 1, totalCogs: 50, totalPrice: 70, createdAt: new Date(), updatedAt: new Date() },
      { productId: 4, item: 'Desktop PC', quantity: 1, totalCogs: 200, totalPrice: 250, createdAt: new Date(), updatedAt: new Date() },
      { productId: 5, item: 'Smartwatch', quantity: 1, totalCogs: 150, totalPrice: 180, createdAt: new Date(), updatedAt: new Date() }
    ], {});
    

    await queryInterface.bulkInsert('Invoices', [
      { productSoldId: 1, date: new Date(new Date().setDate(new Date().getDate() - 6)), customer: 'John Doe', salesperson: 'Jane Smith', paymentType: 'Credit Card', notes: 'Invoice notes 1', createdAt: new Date(), updatedAt: new Date() },
      { productSoldId: 2, date: new Date(new Date().setDate(new Date().getDate() - 5)), customer: 'Alice Johnson', salesperson: 'Mike Brown', paymentType: 'Cash', notes: 'Invoice notes 2', createdAt: new Date(), updatedAt: new Date() },
      { productSoldId: 3, date: new Date(new Date().setDate(new Date().getDate() - 4)), customer: 'Bob Williams', salesperson: 'Sara Davis', paymentType: 'Bank Transfer', notes: 'Invoice notes 3', createdAt: new Date(), updatedAt: new Date() },
      { productSoldId: 4, date: new Date(new Date().setDate(new Date().getDate() - 3)), customer: 'Charlie Brown', salesperson: 'Linda Green', paymentType: 'Credit Card', notes: 'Invoice notes 4', createdAt: new Date(), updatedAt: new Date() },
      { productSoldId: 5, date: new Date(new Date().setDate(new Date().getDate() - 2)), customer: 'David Lee', salesperson: 'Emily White', paymentType: 'Cash', notes: 'Invoice notes 5', createdAt: new Date(), updatedAt: new Date() },
      { productSoldId: 1, date: new Date(new Date().setDate(new Date().getDate() - 1)), customer: 'Eva Green', salesperson: 'James Smith', paymentType: 'Debit Card', notes: 'Invoice notes 6', createdAt: new Date(), updatedAt: new Date() },
      { productSoldId: 2, date: new Date(), customer: 'Frank Miller', salesperson: 'Anna Brown', paymentType: 'PayPal', notes: 'Invoice notes 7', createdAt: new Date(), updatedAt: new Date() },
      { productSoldId: 3, date: new Date(), customer: 'Pak Ajez', salesperson: 'Pak Moen', paymentType: 'PayPal', notes: 'Invoice notes 8', createdAt: new Date(), updatedAt: new Date() }
    ], {});    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
    await queryInterface.bulkDelete('Invoices', null, {});
    await queryInterface.bulkDelete('ProductSolds', null, {});
  }
};
