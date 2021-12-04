const express = require('express');
const route = express.Router();
const CashRegisterAgencyServices = require('../../Services/CashRegisterAgency')
const middleware = require('../../utils/Middleware_validation')
const { restrictTo} = require('../Middleware/auth')
/***************Routes************/

//Add new Agency
route.post('/Add', CashRegisterAgencyServices.Add);
route.post('/Update', CashRegisterAgencyServices.UpdateStatus);
route.post('/delete', CashRegisterAgencyServices.Delete);
route.get('/GetALL', CashRegisterAgencyServices.GetALL);


module.exports = route;