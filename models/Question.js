'use strict';
const { v4: uuidv4 } = require('uuid');
const { Sequelize, DataTypes, Model } = require('sequelize');
const DBConnection = require('../services/DBConnection');

const Topic = require('./Topic');

class Question extends Model {}

Question.init({
  idQuestion: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  },
  idQuestionParent: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  idTopic: {
    type: DataTypes.STRING,
    references: { model: Topic, key: 'idTopic'},
  },
  text: {
    type: DataTypes.TEXT,
  },
  points: {
    type: DataTypes.INTEGER(11),
    defaultValue: 0,
  },
  createdOn: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
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
  tableName: 'questions',
  modelName: 'questions',
  paranoid: true,
});

module.exports = Question;

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