const { check, validationResult } = require('express-validator');

exports.validationFunction = async (req, res, next) => {
	const errors = validationResult(req);
	errors.type = 'expressValidationError';
	if (!errors.isEmpty()) {
		return res.status(500).json(errors.array());
	}
	next();
};
/******User ******/

//StripeValidation
exports.StripeValidation = [
	check('Email')
		.notEmpty()
		.withMessage("Must Enter Email"),
	check('Name')
		.notEmpty()
		.withMessage("Must Enter Name"),
	check('Amount')
		.notEmpty()
		.withMessage("Must Enter Charge Amount"),
	check('CardNumber')
		.notEmpty()
		.withMessage("Must Enter CardNumber"),
	check('ExpYY')
		.notEmpty()
		.withMessage("Must Enter Expiry year"),
	check('ExpMM')
		.notEmpty()
		.withMessage("Must Enter Expiry Month"),
	check('CVV')
		.notEmpty()
		.withMessage("Must Enter CVV code"),

];

//Add Agency Validation
exports.AddAgencyValidation = [
	check('Label').matches(/[0-9]{5}[a-zA-Z]{20}/)
	.withMessage("Label must be 5 digits numbers + 20 digit strings i.e 12345XXXXXXXXXXXXXXXXXXXX"),	
	
];

//Add CashRegister Validation
exports.AddCashRegisterValidation = [
	check('AccountNo').matches(/[a-zA-Z0-9]{20}/)
		.withMessage("AccountNo must be 20 Alphanumeric characters"),
	check('Currency').not().isEmpty()
		.withMessage("must Enter Currency as 'eur', 'xof' "),
	check('Status').not().isEmpty()
		.withMessage("must Enter Status as 'enabled', 'disabled' "),
	check('Duration').not().isEmpty()
		.withMessage("must Enter Duration as 'month', 'bimonthly', 'quarter', 'semester', 'annual' "),
	check('Digits').not().isEmpty().isLength({min:3})
		.withMessage("must Enter 3 digits ")
		

];