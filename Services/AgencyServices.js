const AgencyModel = require('../models/AgencyModel');
const MemberModel = require('../models/MemberModel');
const OperatorModel = require('../models/OperatorModel');
const ProductModel = require('../models/ProductModel');
const catchAsync = require('../utils/catchAsync');
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;


/***************Services************/

//Add
exports.Add = catchAsync(async (req, res, next) => {

    const Agency = await AgencyModel.find({ Label: req.body.Label })
    if (Agency.length < 1) {

        const Record = await AgencyModel.create({ ...req.body })
        console.log("Record", Record)
        if (!Record) {
            throw new Error('Error! Agency cannot be created');
        }
        else {
            return res.status(201).json({
                success: true, message: "Agency Created Successfully", Record
            })
        }

    }
    else {
        return next(new Error('Error! Agency with this Label already exist'))

    }

})

//GetALL
exports.GetALL = catchAsync(async (req, res, next) => {



    const Data = await AgencyModel.aggregate([
        {
            $lookup:
            {
                from: 'CashRegisterAgencies',
                localField: 'CashRegister',
                foreignField: '_id',
                as: 'CashRegister'
            },
        },
        {
            $lookup:
            {
                from: 'products',
                localField: 'Products',
                foreignField: '_id',
                as: 'Products'
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
                from: 'members',
                localField: 'Member',
                foreignField: '_id',
                as: 'Member'
            },
        },

    ])

    if (Data[0]) {

        return res.status(200).json({
            success: true, message: "Data Found", Data
        })

    }
    else {
        return next(new Error('No Data Found'))

    }




})


//GetOne
exports.GetOne = catchAsync(async (req, res, next) => {



    const Data = await AgencyModel.aggregate([

      
        {
            $match: {
                _id: ObjectId(req.body.Id)
            }
        },
        {
            $lookup:
            {
                from: 'CashRegisterAgencies',
                localField: 'CashRegister',
                foreignField: '_id',
                as: 'CashRegister'
            },
        },
        {
            $lookup:
            {
                from: 'products',
                localField: 'Products',
                foreignField: '_id',
                as: 'Products'
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
                from: 'members',
                localField: 'Member',
                foreignField: '_id',
                as: 'Member'
            },
        },

    ])
    console.log(Data)
    if (Data[0]) {

        return res.status(200).json({
            success: true, message: "Agency Found", Data
        })

    }
    else {
        return next(new Error('Agency Not Found'))

    }




})


//Delete
exports.Delete = catchAsync(async (req, res, next) => {



    const Data = await AgencyModel.aggregate([


        {
            $match: {
                _id: ObjectId(req.body.Id)
            }
        },
        {
            $lookup:
            {
                from: 'CashRegisterAgencies',
                localField: 'CashRegister',
                foreignField: '_id',
                as: 'CashRegister'
            },
        },
        {
            $lookup:
            {
                from: 'products',
                localField: 'Products',
                foreignField: '_id',
                as: 'Products'
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
                from: 'members',
                localField: 'Member',
                foreignField: '_id',
                as: 'Member'
            },
        },

    ])
    console.log(Data)
    if (Data[0]) {

        if (Data[0].CashRegister[0]){
            

        }










        return res.status(200).json({
            success: true, message: "Agency Found", Data
        })

    }
    else {
        return next(new Error('Agency Not Found'))

    }




})


//Update
exports.Update = catchAsync(async (req, res, next) => {

    try{

        const Record = await AgencyModel.updateOne({ "_id": req.body.Id  },{ ...req.body });

        if (Record.nModified > 0) {
            return res.status(200).json({
                success: true, message: "Agency Updated Successfully"
            })
        }
        return res.status(500).json({
            success: false, message: "Error!  Agency Not Found"
        })
    }catch(error){

        return next(new Error('Agency Not Found'))
    }
    
})
