const { Model, DataTypes } = require('sequelize');

class TaskDependencies extends Model {}

module.exports = (sequelize) => {
  TaskDependencies.init({
    taskId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Tasks',
        key: 'id',
      },
    },
    dependencyId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Tasks',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'TaskDependencies',
    timestamps: false,
  });

  return TaskDependencies;
};
