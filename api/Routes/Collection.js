const express = require('express');
const route = express.Router();
const CollectionServices = require('../../Services/CollectionServices')
const middleware = require('../../utils/Middleware_validation')
const { restrictTo } = require('../Middleware/auth')
/***************Routes************/

//Add new Agency
route.post('/Add', CollectionServices.Add);
route.post('/Update', CollectionServices.Update);
route.post('/GetOne', CollectionServices.GetOne);
route.get('/GetALL', CollectionServices.GetALL);


module.exports = route;