const Sequelize = require('sequelize');
const schema = require('../../../config/connection');



const UserMaster = schema.define('user', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    userName: { type: Sequelize.STRING , allowNull: false},
    userEmail: { type: Sequelize.STRING, default: null },
    userPassword: { type: Sequelize.STRING, allowNull: false},
    token: { type: Sequelize.STRING, default: null  },
    createdDate: { type: 'TIMESTAMP', defaultValue: Sequelize.literal('createdDate'), allowNull: false },
    modifiedDate: { type: 'TIMESTAMP', defaultValue: Sequelize.literal('modifiedDate'), allowNull: false }
}, {
    freezeTableName: true // Model tableName will be the same as the model name
});


module.exports = UserMaster;
