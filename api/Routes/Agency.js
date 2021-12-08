const express = require('express');
const route = express.Router();
const AgencyServices = require('../../Services/AgencyServices')
const middleware = require('../../utils/Middleware_validation')
const { restrictTo } = require('../Middleware/auth')
/***************Routes************/

//Add new Agency
route.post('/Add',AgencyServices.Add);
route.post('/GetOne', AgencyServices.GetOne);
route.post('/Update', AgencyServices.Update);
route.get('/getall', AgencyServices.GetALL);


module.exports = route;