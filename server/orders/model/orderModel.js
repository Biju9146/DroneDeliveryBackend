const Sequelize = require('sequelize');
const schema = require('../../../config/connection');

const OrderMaster = schema.define('order', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: Sequelize.STRING , allowNull: false},
    userEmail: { type: Sequelize.STRING, allowNull: false},
    userMobile: { type: Sequelize.STRING, default: null },
    userAddress: { type: Sequelize.STRING, default: null },
    recepientName: { type: Sequelize.STRING, default: null },
    recepientEmail: { type: Sequelize.STRING, default: null },
    recepientContact: { type: Sequelize.STRING, default: null },
    recepientAddress: { type: Sequelize.STRING, default: null },
    recepientLatLng: { type: Sequelize.STRING, default: null },
    typeofParcel: { type: Sequelize.STRING, default: null },
    parcelWeight: { type: Sequelize.STRING, default: null },
    deliveryFlag: { type: Sequelize.STRING, default: null },
    createdDate: { type: 'TIMESTAMP', defaultValue: Sequelize.literal('createdDate'), allowNull: false },
    modifiedDate: { type: 'TIMESTAMP', defaultValue: Sequelize.literal('modifiedDate'), allowNull: false }
}, {
    freezeTableName: true // Model tableName will be the same as the model name
});


module.exports = OrderMaster;
