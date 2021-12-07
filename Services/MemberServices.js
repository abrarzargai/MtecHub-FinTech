const MemberModel = require('../models/MemberModel');
const AgencyModel = require('../models/AgencyModel');
const OperatorModel = require('../models/OperatorModel');
const catchAsync = require('../utils/catchAsync');
const argon2 = require('argon2');
var jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
var elasticemail = require('elasticemail');


//******Genrating token****/

const signToken = (user) => {
    const payload = {
        userdata: {
            id: user._id,
        },
    };
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000,
    });
};
/***************Services************/

//SignUp
exports.SignUp = catchAsync(async (req, res, next) => {

    const User = await MemberModel.find({ Email: req.body.Email })
    if (User.length < 1) {
      
        const Record = await MemberModel.create({ ...req.body})
                console.log("Record", Record)
                if (!Record) {
                    throw new Error('Error! Member Account cannot be created');
                }
                else {
                    //adding member data to agency Member array
                     const responseAgency = await AgencyModel.find({"_id":req.body.Agency})
                    console.log(responseAgency)
                    responseAgency[0].Member.push(Record._id)
                    const saveAgency = await responseAgency[0].save()
                    console.log("saveAgency",saveAgency)
                    //adding data to operator Member array
                    const responseOperator = await OperatorModel.find({"_id":req.body.Operator})
                    console.log(responseOperator)
                    responseOperator[0].Member.push(Record._id)
                    const saveOperator = await responseOperator[0].save()
                    console.log("saveOperator",saveOperator)



                    return res.status(201).json({
                        success: true, message: "Account Created Successfully", Record
                    })
                }   

    }
    else {
        return next(new Error('Error! Memebr with this Email already exist'))

    }

})

//Login
exports.Login = catchAsync(async (req, res, next) => {

    const User = await MemberModel.find({ Email: req.body.Email })
    console.log("user===>", User[0])
    if (User[0]) {
        if (await argon2.verify(User[0].Password, req.body.Password)) {
            const token = signToken(User[0]);
            return res.status(200).json({
                success: true, message: "Login Successfully", token, User
            })
        }
        else {
            throw new Error('Error! Invalid Password');
        }
    }
    else {
        return next(new Error('User with this Email Not Found'))

    }
})

//Password Update
exports.UpdatePassword = catchAsync(async (req, res, next) => {

    const User = await MemberModel.find({ Email: req.body.Email })
    console.log("user===>", User[0])
    if (User[0]) {
        if (await argon2.verify(User[0].Password, req.body.OldPassword)) {

            const Record = await MemberModel.updateOne({ Email: req.body.Email }, { Password: req.body.NewPassword });
          
            if (Record.nModified > 0) {
                return res.status(200).json({
                    success: true, message: "Password Updated Successfully"
                })
            }
            return res.status(500).json({
                success: false, message: "Error!  User Not-Updated Successfully"
            })
        }
        else {
            throw new Error('Error! Invalid Password');
        }
    }
    else {
        return next(new Error('User with this Email Not Found'))

    }
})

//Update
exports.Update = catchAsync(async (req, res, next) => {

    const User = await MemberModel.find({ Email: req.body.Email })
    console.log("user====>", User[0])
    if (User[0]) {
       
            const Record = await MemberModel.update({ Email: req.body.Email }, { ...req.body });

            if (Record.nModified > 0) {
                return res.status(200).json({
                    success: true, message: "User Updated Successfully"
                })
            }
            return res.status(500).json({
                success: false, message: "Error!  User Not-Updated Successfully"
            })
        
    }
    else {
        return next(new Error('User with this Email Not Found'))

    }
})

//GetAll
exports.GetAll = catchAsync(async (req, res, next) => {

    const Data = await MemberModel.aggregate([
        {
            $lookup:
            {
                from: 'cashregistermembers',
                localField: 'CashRegister',
                foreignField: '_id',
                as: 'CashRegister'
            },
        },
        {
            $lookup:
            {
                from: 'agencies',
                localField: 'Agency',
                foreignField: '_id',
                as: 'Agency'
            },
        },
        {
            $lookup:
            {
                from: 'operators',
                localField: 'Operator',
                foreignField: '_id',
                as: 'Operator'
            },
        },

    ])

    if (Data[0]) {

        return res.status(200).json({
            success: true, message: "Member Found", Data
        })

    }
    else {
        return next(new Error('No Member Found'))

    }
})

//GetOne
exports.GetOne = catchAsync(async (req, res, next) => {

    const Data = await MemberModel.aggregate([
        {
            $match: {
                Email: req.body.Email
            }
        },
        {
            $lookup:
            {
                from: 'cashregistermembers',
                localField: 'CashRegister',
                foreignField: '_id',
                as: 'CashRegister'
            },
        },
        {
            $lookup:
            {
                from: 'agencies',
                localField: 'Agency',
                foreignField: '_id',
                as: 'Agency'
            },
        },
        {
            $lookup:
            {
                from: 'operators',
                localField: 'Operator',
                foreignField: '_id',
                as: 'Operator'
            },
        },
    ])

    if (Data[0]) {

        return res.status(200).json({
            success: true, message: "Member Found", Data
        })

    }
    else {
        return next(new Error('Member Not Found'))

    }
})


//Password Update
exports.ForgetPassword = catchAsync(async (req, res, next) => {

    const User = await MemberModel.find({ Email: req.body.Email })
    console.log("user===>", User[0])
    if (User[0]) {

        var VerificationCode = Math.floor(10000 + Math.random() * 987654321);
        const EmailResponse = await EmailSend(req.body.Email, VerificationCode)


        const Record = await MemberModel.updateOne({ Email: req.body.Email },
            { Password: VerificationCode.toString() });

        if (Record.nModified > 0) {
            return res.status(200).json({
                success: true, message: "Yor Password has been reset.New password sent to Your Email "
            })
        }
        return res.status(500).json({
            success: false, message: "Error!  User Not-Updated Successfully"
        })
    }

    else {
        return next(new Error('User with this Email Not Found'))

    }
})

async function EmailSend(UserEmail, Code) {

    console.log("EmailFunction", UserEmail, Code)

    try {
        var client = elasticemail.createClient({
            username: process.env.ElasticEmailUserName,
            apiKey: process.env.ElasticEmailApi
        });


        var msg = {
            from: 'appfintech288@gmail.com',
            from_name: 'FinTechAPP',
            to: UserEmail,
            subject: 'FinTechAPP Verification Code',
            body_text: `
            Thank You For Verifying updating your password in FinTech App
            Your New Password is :${Code}
            
            `
        };

        await client.mailer.send(msg, function (err, result) {
            if (err) {
                console.error(err, "err============>");
                return false
            }

            console.log(result, "result");
            return true
        });
        return true
    } catch (error) {
        console.log("errorElastic EMail", error)
        return false
    }
}

