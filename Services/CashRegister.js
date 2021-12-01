const CashRegisterModel = require('../models/CashRegisterModel');
const catchAsync = require('../utils/catchAsync');



/***************Services************/

//Add
exports.Add = catchAsync(async (req, res, next) => {

    const Data = await CashRegisterModel.find({ AccountNo: req.body.AccountNo })
    if (Data.length < 1) {

        const Record = await CashRegisterModel.create({ ...req.body })
        console.log("Record", Record)
        if (!Record) {
            throw new Error('Error! CashRegister cannot be created');
        }
        else {
            return res.status(201).json({
                success: true, message: "CashRegister Created Successfully", Record
            })
        }

    }
    else {
        return next(new Error('Error! CashRegister with this AccountNo already exist'))

    }

})

//Update Cash Register Status Enable/Disable
exports.UpdateStatus = catchAsync(async (req, res, next) => {

    const Data = await CashRegisterModel.find({ AccountNo: req.body.AccountNo })
   
    if (Data[0]) {
       
        const Record = await CashRegisterModel.updateOne({ AccountNo: req.body.AccountNo }, 
            { Status: req.body.Status });

            if (Record.nModified > 0) {
                return res.status(200).json({
                    success: true, message: "Cash Register Status Updated Successfully"
                })
            }
            return res.status(500).json({
                success: false, message: "Error!  Cash Register Status Not-Updated Successfully"
            })
        
       
    }
    else {
        return next(new Error('Cash Register with this AccountNo Not Found'))

    }

})

