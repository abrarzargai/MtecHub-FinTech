const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
//Required api's 

const Payment = require('./Routes/Payment')
const ImageUpload = require('./Routes/ImageUpload')

const Admin = require('./Routes/Admin')
const Agency = require('./Routes/Agency')
const CashRegister = require('./Routes/CashRegister')
const Products = require('./Routes/Products')
const Member = require('./Routes/Member')
const Operator = require('./Routes/Operator')
const Auth = require('./Routes/Auth')

/*********Main Api**********/
router.use('/Admin',Admin);
router.use('/Agency', Agency);
router.use('/CashRegister', CashRegister);
router.use('/Product', Products);
router.use('/Operator', Operator);
router.use('/Member', Member);
router.use('/Auth', Auth);


//Common Api's
router.use('/Payment', Payment);
router.use('/Upload', ImageUpload);

module.exports = router;