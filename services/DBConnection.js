const Sequelize = require('sequelize');
const Promise = require('bluebird');
const dotenv = require('dotenv');
const mysql2 = require('mysql2');

dotenv.config();

const { Op } = Sequelize;

Sequelize.Promise = Promise;

const operatorsAliases = {
    $eq: Op.eq,
    $ne: Op.ne,
    $gte: Op.gte,
    $gt: Op.gt,
    $lte: Op.lte,
    $lt: Op.lt,
    $not: Op.not,
    $in: Op.in,
    $notIn: Op.notIn,
    $is: Op.is,
    $like: Op.like,
    $notLike: Op.notLike,
    $iLike: Op.iLike,
    $notILike: Op.notILike,
    $regexp: Op.regexp,
    $notRegexp: Op.notRegexp,
    $iRegexp: Op.iRegexp,
    $notIRegexp: Op.notIRegexp,
    $between: Op.between,
    $notBetween: Op.notBetween,
    $overlap: Op.overlap,
    $contains: Op.contains,
    $contained: Op.contained,
    $adjacent: Op.adjacent,
    $strictLeft: Op.strictLeft,
    $strictRight: Op.strictRight,
    $noExtendRight: Op.noExtendRight,
    $noExtendLeft: Op.noExtendLeft,
    $and: Op.and,
    $or: Op.or,
    $any: Op.any,
    $all: Op.all,
    $values: Op.values,
    $col: Op.col,
};

const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

console.log('DB_HOST', DB_HOST);
console.log('DB_PORT', DB_PORT);

const DBConnection = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql',
    dialectModule: mysql2,
    dialectOptions: {
        connectTimeout: 60000,
    },
    pool: {
        max: 100,
        min: 0,
        acquire: 60000,
        idle: 60000,
    },
    define: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        timestamps: false,
    },
    logging: !!process.env.DB_LOG,
    operatorsAliases,
});

module.exports = DBConnection;
