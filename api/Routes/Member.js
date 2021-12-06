const express = require('express');
const route = express.Router();
const MemberServices = require('../../Services/MemberServices')
const middleware = require('../../utils/Middleware_validation')
/***************Routes************/


route.post('/signup', MemberServices.SignUp);
route.post('/login', MemberServices.Login);
route.post('/updatepassword', MemberServices.UpdatePassword);
route.post('/update', MemberServices.Update);
route.post('/GetOne', MemberServices.GetOne);
route.post('/forgetpassword', MemberServices.GetOne);
route.get('/GetAll', MemberServices.GetAll);
route.get('/ForgetPassword', MemberServices.GetAll);


module.exports = route;