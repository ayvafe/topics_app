'use strict';
const { v4: uuidv4 } = require('uuid');
const { Sequelize, DataTypes, Model } = require('sequelize');
const DBConnection = require('../services/DBConnection');

class User extends Model {}

User.init({
  idUser: {
    type: DataTypes.STRING,
    primaryKey: true,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  },
  email: {
    type: DataTypes.STRING,
  },
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  passwordHash: {
    type: DataTypes.STRING,
  },
  type: {
    type: DataTypes.ENUM("0", "1"),
    allowNull: false,
    defaultValue: 0,
  },
  createdOn: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  updatedOn: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  deletedOn: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null
  },
},
{
  sequelize: DBConnection,
  tableName: 'users',
  modelName: 'users',
  paranoid: true,
});

module.exports = User;
