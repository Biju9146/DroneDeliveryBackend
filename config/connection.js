const Sequelize = require('sequelize');
const config_development = require('./development');
const moment = require('moment-timezone')


const sequelizeConn = new Sequelize(config_development.mysql.database, config_development.mysql.user, config_development.mysql.password, {
    timezone : moment.tz(config_development.serverTimeZone).format('Z').toString(),
    host: config_development.mysql.host,
      dialect: 'mysql',
      logging: config_development.mysql.logging,
      pool: { 
          max: 5,
          min: 0,
          idle: 10000
      },
      define: {
          timestamps: false, // this will remove sequalise createdAt, updatedAt field check
          raw: true  
        },
      dialectOptions: { dateStrings: true,
         typeCast(field, next) {
        // for reading from database
        if (field.type === 'TIMESTAMP' || field.type === 'DATETIME' || field.type === 'DATE') {
            return field.string();
        }
        return next();
    }}
  });

  module.exports = sequelizeConn;