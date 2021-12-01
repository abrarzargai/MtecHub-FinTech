const express = require('express');
const route = express.Router();
const AdminServices = require('../../Services/AdminServices')
const middleware = require('../../utils/Middleware_validation')
/***************Routes************/

//SignUp
route.post('/signup', AdminServices.SignUp);
//Login
route.post('/login', AdminServices.Login);
//change Password
route.post('/updatepassword', AdminServices.UpdatePassword);


module.exports = route;