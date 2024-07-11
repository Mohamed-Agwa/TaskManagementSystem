const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

class User extends Model {
  static associate(models) {
    User.hasMany(models.Task, { foreignKey: 'assigneeId' });
  }

  validPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }
}

module.exports = (sequelize) => {
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('Manager', 'User'),
      defaultValue: 'User'
    }
  }, { sequelize, modelName: 'User' });

  User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
  });

  return User;
};
