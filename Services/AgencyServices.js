const AgencyModel = require('../models/AgencyModel');
const catchAsync = require('../utils/catchAsync');



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
                localField: 'Product',
                foreignField: '_id',
                as: 'Product'
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
