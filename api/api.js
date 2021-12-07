const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
//Required api's 

const Payment = require('./Routes/Payment')
const ImageUpload = require('./Routes/ImageUpload')

const Admin = require('./Routes/Admin')
const Agency = require('./Routes/Agency')
const CashRegisterMember = require('./Routes/CashRegisterMember')
const CashRegisterAgency = require('./Routes/CashRegisterAgency')
const Products = require('./Routes/Products')
const Member = require('./Routes/Member')
const Operator = require('./Routes/Operator')
const Auth = require('./Routes/Auth')
const Subscription = require('./Routes/Subscription')

/*********Main Api**********/
router.use('/Admin',Admin);
router.use('/Agency', Agency);
router.use('/CashRegisterAgency', CashRegisterAgency);
router.use('/CashRegisterMember', CashRegisterMember);
router.use('/Product', Products);
router.use('/Operator', Operator);
router.use('/Member', Member);
router.use('/Auth', Auth);
router.use('/Subscription', Subscription);


//Common Api's
router.use('/Payment', Payment);
router.use('/Upload', ImageUpload);

module.exports = router;