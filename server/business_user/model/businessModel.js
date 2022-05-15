const Sequelize = require('sequelize');
const schema = require('../../../config/connection');

const UserMaster = schema.define('user', {
    business_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    business_name: { type: Sequelize.STRING , allowNull: false},
    business_password: { type: Sequelize.STRING, allowNull: false},
    token: { type: Sequelize.STRING, default: null  },
    email_id: { type: Sequelize.STRING, default: null },
    mobile_number: { type: Sequelize.STRING, default: null },
    business_login_auth: { type: Sequelize.INTEGER, default: null },
    business_location: { type: Sequelize.STRING, default: null },
    business_delivery_type: { type: Sequelize.STRING, default: null },
    created_at: { type: 'TIMESTAMP', defaultValue: Sequelize.literal('created_at'), allowNull: false },
    modified_at: { type: 'TIMESTAMP', defaultValue: Sequelize.literal('modified_at'), allowNull: false }
}, {
    freezeTableName: true // Model tableName will be the same as the model name
});


module.exports = UserMaster;
