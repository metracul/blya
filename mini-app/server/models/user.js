const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const User = sequelize.define('User', {
  userId: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  balance: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = User;

