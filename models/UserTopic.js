'use strict';
const { Sequelize, DataTypes, Model } = require('sequelize');
const DBConnection = require('../services/DBConnection');

const Question = require('./Question');
const Topic = require('./Topic');
const User = require('./User');

class UserTopic extends Model {}

UserTopic.init({
  idUser: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    references: { model: User, key: 'idUser'},
  },
  idTopic: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    references: { model: Topic, key: 'idTopic'},
  },
  idLastUnlockedQuestion: {
    type: DataTypes.STRING,
    allowNull: true,
    references: { model: Question, key: 'idQuestion'},
  },
},
{
  timestamps: false,
  sequelize: DBConnection,
  tableName: 'user_topics',
  modelName: 'user_topics',
  paranoid: true,
});

module.exports = UserTopic;

UserTopic.belongsTo(User, { foreignKey: 'idUser' });
UserTopic.belongsTo(Topic, { foreignKey: 'idTopic' });
UserTopic.belongsTo(Question, { foreignKey: 'idLastUnlockedQuestion' });

