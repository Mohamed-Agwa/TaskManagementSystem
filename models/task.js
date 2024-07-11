const { Model, DataTypes } = require('sequelize');

class Task extends Model {
  static associate(models) {
    Task.belongsToMany(models.Task, {
      through: 'TaskDependencies',
      as: 'Dependencies',
      foreignKey: 'taskId',
      otherKey: 'dependencyId'
    });
    Task.belongsToMany(models.Task, {
      through: 'TaskDependencies',
      as: 'DependedOnBy',
      foreignKey: 'dependencyId',
      otherKey: 'taskId'
    });
    Task.belongsTo(models.User, { as: 'assignee', foreignKey: 'assigneeId' });
  }
}

module.exports = (sequelize) => {
  Task.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('pending', 'completed', 'canceled'),
      defaultValue: 'pending'
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, { sequelize, modelName: 'Task' });

  return Task;
};
