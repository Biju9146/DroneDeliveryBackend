const express = require('express');
const routes = express.Router();
const OrderCtrl = require('./controller/index');
const middleware = require('../../middleware')


routes.post('/placeOrder', middleware.verifyTokenMiddleware, OrderCtrl.placeOrder);
routes.get('/getOrders', middleware.verifyTokenMiddleware, OrderCtrl.getAllOrder);
routes.put('/updateOrdersStatus', middleware.verifyTokenMiddleware, OrderCtrl.updateOrderStatus);



module.exports = routes;
