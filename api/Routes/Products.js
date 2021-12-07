const express = require('express');
const route = express.Router();
const ProductServices = require('../../Services/ProductServices')
const middleware = require('../../utils/Middleware_validation')
/***************Routes************/


route.post('/Add',  ProductServices.Add);
route.post('/update', ProductServices.Update);
route.post('/delete', ProductServices.Delete);
route.post('/GetOne', ProductServices.GetOne);
route.get('/GetAll', ProductServices.GetAll);

module.exports = route;