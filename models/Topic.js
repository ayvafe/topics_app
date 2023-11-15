'use strict';
const { v4: uuidv4 } = require('uuid');
const { Sequelize, DataTypes, Model } = require('sequelize');
const DBConnection = require('../services/DBConnection');


class Topic extends Model {}

Topic.init({
  idTopic: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  },
  title: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
  createdOn: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  },
  publishedOn: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null
  },
  deletedOn: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null
  },
},
{
  timestamps: false,
  sequelize: DBConnection,
  tableName: 'topics',
  modelName: 'topics',
  paranoid: true,
});

module.exports = Topic;

Topic.hasMany(Question, {
  as: "questions",
  foreignKey: "idTopic",
  onUpdate: "NO ACTION",
  onDelete: "CASCADE",
});

Question.belongsTo(Topic, {
  as: "topic",
  foreignKey: "idTopic",
  onUpdate: "NO ACTION",
  onDelete: "CASCADE",
});