const express = require('express');
const route = express.Router();
const CashRegisterMemberServices = require('../../Services/CashRegisterMember')
const middleware = require('../../utils/Middleware_validation')
const { restrictTo} = require('../Middleware/auth')
/***************Routes************/

//Add new Agency
route.post('/Add', CashRegisterMemberServices.Add);
route.post('/Update', CashRegisterMemberServices.UpdateStatus);
route.post('/delete', CashRegisterMemberServices.Delete);
route.get('/GetALL', CashRegisterMemberServices.GetALL);


module.exports = route;