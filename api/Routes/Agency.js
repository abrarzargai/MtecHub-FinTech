const express = require('express');
const route = express.Router();
const AgencyServices = require('../../Services/AgencyServices')
const middleware = require('../../utils/Middleware_validation')
const { restrictTo } = require('../Middleware/auth')
/***************Routes************/

//Add new Agency
route.post('/Add',
    restrictTo('admin'),    
    middleware.AddAgencyValidation, middleware.validationFunction, 
    AgencyServices.Add);


module.exports = route;