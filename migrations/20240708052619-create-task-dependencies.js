module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TaskDependencies', {
      taskId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'Tasks',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      dependencyId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'Tasks',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('TaskDependencies');
  },
};
