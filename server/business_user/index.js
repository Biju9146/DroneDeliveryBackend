const express = require('express');
const routes = express.Router();
const businessCtrl = require('./controller/index');
const middleware = require('../../middleware')


routes.post('/', businessCtrl.checkBusinessLogin);
routes.post('/userRegistration',middleware.verifyTokenMiddleware,businessCtrl.businessRegistration);



module.exports = routes;