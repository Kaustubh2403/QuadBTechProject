const Sequelize = require('sequelize')
const config = require('../../../config.json')
// MODELS
const usersModel = require('../connection/models/usersModel')

const sequelize = new Sequelize(
  config.DATABASE_NAME,
  config.DATABASE_USERNAME,
  config.DATABASE_PASSWORD,
  {
    host: config.DATABASE_HOST,
    dialect: 'mysql',
    pool: {
      max: 10,
      min: 2,
      acquire: 30000,
      idle: 10000
    },
    dialectOptions: {
      useUTC: false,
      dateStrings: true,
      typeCast: true
    },
    timezone: '+05:30',
    logging: false
  })
//models
const users = usersModel(sequelize, Sequelize)

module.exports = sequelize