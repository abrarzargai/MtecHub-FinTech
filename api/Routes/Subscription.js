const express = require('express');
const route = express.Router();
const SubscriptionServices = require('../../Services/SubscriptionServices')
const middleware = require('../../utils/Middleware_validation')

/***************Routes************/


route.post('/Add', SubscriptionServices.Add);
route.post('/Update', SubscriptionServices.Update);
route.post('/GetAllByAgency', SubscriptionServices.GetAllByAgency);
route.post('/GetAllByMember', SubscriptionServices.GetAllByMember);
route.post('/GetAllByOperator', SubscriptionServices.GetAllByOperator);
route.post('/GetQuerry', SubscriptionServices.GetQuerry);
route.post('/GetOne', SubscriptionServices.GetOne);


module.exports = route;