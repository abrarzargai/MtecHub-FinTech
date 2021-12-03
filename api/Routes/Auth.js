const express = require('express');
const route = express.Router();
const MiddleWare = require('../../utils/Middleware_validation')
const stripe = require('stripe')(process.env.Stripe_Secret_key)
var elasticemail = require('elasticemail');
const { authenticate } = require('../Middleware/auth')
/***************Routes************/


route.post('/Email', async (req, res,next) => {
     console.log("Email Hit")
    // var VerificationCode = Math.floor(1000 + Math.random() * 9000);
    // console.log(VerificationCode);
    
    try {
        
        var client = elasticemail.createClient({
            username: process.env.ElasticEmailUserName,
            apiKey: process.env.ElasticEmailApi
            });

           
            var msg = {
            from: 'appfintech288@gmail.com',
            from_name: 'FinTechAPP',
                to: req.body.Email,
                subject: 'FinTechAPP Verification Code',
                body_text: `
            Thank You For Registering Your Account in FinTech App
            Your Verification code is :${req.body.Code}
            
            `
            };
            
            client.mailer.send(msg, function(err, result) {
            if (err) {
            console.error(err,"err============>");
            }
            
                console.log(result, "result");
                return res.status(200).json({
                    success: true, message: "Verification Code sent to Your Email Successfully.Please check your Email/spam"
                })
            });
            
       }catch(error) {
        
           throw new Error(error);
        } 

});



module.exports = route;