const express = require('express');
const routes = express.Router();
const LoginCtrl = require('./controller/index');
const middleware = require('../../middleware')
// middleware.verifyTokenMiddleware


routes.post('/',LoginCtrl.checkLogin);
routes.post('/userRegistration',LoginCtrl.userRegistration);
// routes.post('/changePassword', middleware.verifyTokenMiddleware, LoginCtrl.changePassword);


module.exports = routes;