const express = require('express');
const router = express.Router();

//Required api's 

const Payment = require('./Routes/Payment')
const ImageUpload = require('./Routes/ImageUpload')

const Admin = require('./Routes/Admin')
const Agency = require('./Routes/Agency')
const CashRegister = require('./Routes/CashRegister')

/*********Main Api**********/
router.use('/Admin',Admin);
router.use('/Agency', Agency);
router.use('/CashRegister', CashRegister);

//Common Api's
router.use('/Payment', Payment);
router.use('/Upload', ImageUpload);

module.exports = router;