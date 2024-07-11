'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Tasks', [
      {
        title: 'Task 1',
        description: 'First task',
        status: 'pending',
        dueDate: new Date(),
        assigneeId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Task 2',
        description: 'Second task',
        status: 'pending',
        dueDate: new Date(),
        assigneeId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Task 2',
        description: 'Second task',
        status: 'completed',
        dueDate: new Date(),
        assigneeId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Task 2',
        description: 'Second task',
        status: 'completed',
        dueDate: new Date(),
        assigneeId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Tasks', null, {});
  }
};
