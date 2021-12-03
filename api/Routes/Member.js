const express = require('express');
const route = express.Router();
const MemberServices = require('../../Services/MemberServices')
const middleware = require('../../utils/Middleware_validation')
/***************Routes************/


route.post('/signup', MemberServices.SignUp);
route.post('/login', MemberServices.Login);
route.post('/updatepassword', MemberServices.UpdatePassword);
route.post('/update', MemberServices.Update);


module.exports = route;