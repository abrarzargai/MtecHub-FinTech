const AgencyModel = require('../models/AgencyModel');
const OperatorModel = require('../models/OperatorModel');
const catchAsync = require('../utils/catchAsync');
const argon2 = require('argon2');
var jwt = require('jsonwebtoken');



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

    const User = await OperatorModel.find({ Email: req.body.Email })
    if (User.length < 1) {
      
        const Record = await OperatorModel.create({ ...req.body})
                console.log("Record", Record)
                if (!Record) {
                    throw new Error('Error! User cannot be created');
                }
                else {
                    //Operator created here now adding operator ID to agency database
                    const response = await AgencyModel.find({"_id":req.body.Agency})
                    console.log(response)
                    response[0].Operator.push(Record._id)
                    const save = await response[0].save()
                    console.log("save",save)
                    return res.status(201).json({
                        success: true, message: "Account Created Successfully", Record
                    })

                    
                }   

    }
    else {
        return next(new Error('Error! User with this Email already exist'))

    }

})

//Login
exports.Login = catchAsync(async (req, res, next) => {

    const User = await OperatorModel.find({ Email: req.body.Email })
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

    const User = await OperatorModel.find({ Email: req.body.Email })
    console.log("user===>", User[0])
    if (User[0]) {
        if (await argon2.verify(User[0].Password, req.body.OldPassword)) {

            const Record = await OperatorModel.updateOne({ Email: req.body.Email }, { Password: req.body.NewPassword });
          
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

    const User = await OperatorModel.find({ Email: req.body.Email })
    console.log("user===>", User[0])
    if (User[0]) {
       

            const Record = await OperatorModel.update({ Email: req.body.Email }, { ...req.body });

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

