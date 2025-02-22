'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Add this field:
    phone: {
      type: DataTypes.STRING,
      allowNull: true  // or false if you want to force phone to be required
    },
    role: {
      type: DataTypes.ENUM('customer', 'technician', 'admin'),
      allowNull: false,
      defaultValue: 'customer'
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users'
  });
  return User;
};
