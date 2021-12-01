const express = require('express');
const route = express.Router();
const CashRegisterServices = require('../../Services/CashRegister')
const middleware = require('../../utils/Middleware_validation')
const { restrictTo} = require('../Middleware/auth')
/***************Routes************/

//Add new Agency
route.post('/Add', middleware.AddCashRegisterValidation, middleware.validationFunction, CashRegisterServices.Add);
route.post('/UpdateStatus', restrictTo('admin'), CashRegisterServices.UpdateStatus);


module.exports = route;