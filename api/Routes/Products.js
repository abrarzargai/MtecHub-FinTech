const express = require('express');
const route = express.Router();
const ProductServices = require('../../Services/ProductServices')
const middleware = require('../../utils/Middleware_validation')
/***************Routes************/


route.post('/Add', middleware.AddProductValidation, middleware.validationFunction , ProductServices.Add);
route.post('/update', ProductServices.Update);
route.post('/delete', ProductServices.Delete);
route.get('/GetAll', ProductServices.GetAll);

module.exports = route;