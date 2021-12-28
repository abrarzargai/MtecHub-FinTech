const express = require('express');
const route = express.Router();
const MiddleWare = require('../../utils/Middleware_validation')
const stripe = require('stripe')(process.env.Stripe_Secret_key)
var elasticemail = require('elasticemail');
const nodemailer = require("nodemailer");
const { authenticate } = require('../Middleware/auth')
/***************Routes************/


route.post('/email', async (req, res, next) => {
    console.log("Email Hit", req.body)


    try {
        var transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            auth: {
                user: process.env.Gmail,
                pass: process.env.Password
            },
        });

        var mailOptions = {
            from: process.env.Gmail,
            to: req.body.Email,
            subject: 'FinTech App VerificationCode',
            text: `
            
            Thank you for Using FinTech App!
             Your Verification code is : ${req.body.Code}
            `
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log("error==>", error);
                throw new Error('Error! Please Enter Valid Email Address');
            } else {

                console.log('Email sent: ' + info.response);
                return res.status(200).json({
                    success: true, message: "Email Sent Successfully.Please Check Your Email for verification Code"
                })
            }
        });


    } catch (error) {

        throw new Error(error);
    }

});



module.exports = route;