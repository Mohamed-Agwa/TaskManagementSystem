'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('password123', 10);
    await queryInterface.bulkInsert('Users', [
      {
        username: 'manager',
        password: hashedPassword,
        role: 'Manager',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'user1',
        password: hashedPassword,
        role: 'User',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'user2',
        password: hashedPassword,
        role: 'User',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
