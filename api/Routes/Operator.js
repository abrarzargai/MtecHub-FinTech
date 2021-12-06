const express = require('express');
const route = express.Router();
const OperatorServices = require('../../Services/OperatorServices')
const middleware = require('../../utils/Middleware_validation')

/***************Routes************/

//SignUp
route.post('/signup', OperatorServices.SignUp);
route.post('/login', OperatorServices.Login);
route.post('/updatepassword', OperatorServices.UpdatePassword);
route.post('/update', OperatorServices.Update);
route.get('/GetAll', OperatorServices.GetAll);
route.post('/Getone', OperatorServices.GetOne);
route.post('/ForgetPassword', OperatorServices.ForgetPassword);

module.exports = route;