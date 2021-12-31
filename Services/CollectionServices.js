const CollectionModel = require('../models/CollectionModel');
const MemberModel = require('../models/MemberModel');
const AgencyModel = require('../models/AgencyModel');
const OperatorModel = require('../models/OperatorModel');
const SubscriptionModel = require('../models/Subscription');
const catchAsync = require('../utils/catchAsync');
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;


/***************Services************/

//Add
exports.Add = catchAsync(async (req, res, next) => {
   // console.log("Body Collection hit",req.body)
    const Handler = await CashRegisterHandler(req.body)
    console.log("Handler",Handler)
    if (!Handler){
        throw new Error('Error! Amount already collected for this Date');
    }
    
    const Record = await CollectionModel.create({ ...req.body })
    console.log("Record", Record)
    if (!Record) {
        throw new Error('Error! Account cannot added to collection');
    }
    else {
        return res.status(201).json({
            success: true, message: "New Account Added to Collection Successfully", Record
        })
    }

})

//GetALL
exports.GetALL = catchAsync(async (req, res, next) => {



    const Data = await CollectionModel.aggregate([

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
                localField: 'Customer',
                foreignField: '_id',
                as: 'Customer'
            },
        },
        {
            $lookup:
            {
                from: 'subscriptions',
                localField: 'Subscription',
                foreignField: '_id',
                as: 'Subscription'
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



    const Data = await CollectionModel.aggregate([


        {
            $match: {
                _id: ObjectId(req.body.Id)
            }
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
                localField: 'Customer',
                foreignField: '_id',
                as: 'Customer'
            },
        },
        {
            $lookup:
            {
                from: 'subscriptions',
                localField: 'Subscription',
                foreignField: '_id',
                as: 'Subscription'
            },
        },

    ])
    console.log(Data)
    if (Data[0]) {

        return res.status(200).json({
            success: true, message: "Data Found", Data
        })

    }
    else {
        return next(new Error('Data Not Found'))

    }




})

//Update
exports.Update = catchAsync(async (req, res, next) => {

    try {

        const Record = await CollectionModel.updateOne({ "_id": req.body.Id }, { ...req.body });

        if (Record.nModified > 0) {
            return res.status(200).json({
                success: true, message: "Collection Account Updated Successfully"
            })
        }
        return res.status(500).json({
            success: false, message: "Error!  Collection Account Not-Updated"
        })
    } catch (error) {

        return next(new Error('Agency Not Found'))
    }

})

//GetCollections Account by Agency
exports.GetByAgency = catchAsync(async (req, res, next) => {



    const Data = await CollectionModel.aggregate([


        {
            $match: {
                Agency: ObjectId(req.body.AgencyId)
            }
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
                localField: 'Customer',
                foreignField: '_id',
                as: 'Customer'
            },
        },
        {
            $lookup:
            {
                from: 'subscriptions',
                localField: 'Subscription',
                foreignField: '_id',
                as: 'Subscription'
            },
        },

    ])
    console.log(Data)
    if (Data[0]) {

        return res.status(200).json({
            success: true, message: "Data Found", Data
        })

    }
    else {
        return next(new Error('Data Not Found'))

    }




})

//GetCollections Account by Agency
exports.GetByMember = catchAsync(async (req, res, next) => {



    const Data = await CollectionModel.aggregate([


        {
            $match: {
                Customer: ObjectId(req.body.MemberId)
            }
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
                localField: 'Customer',
                foreignField: '_id',
                as: 'Customer'
            },
        }, 
        {
            $lookup:
            {
                from: 'subscriptions',
                localField: 'Subscription',
                foreignField: '_id',
                as: 'Subscription'
            },
        },

    ])
    console.log(Data)
    if (Data[0]) {

        return res.status(200).json({
            success: true, message: "Data Found", Data
        })

    }
    else {
        return next(new Error('Data Not Found'))

    }




})

//GetCollections Account by Products
exports.GetByProduct = catchAsync(async (req, res, next) => {



    const Data = await CollectionModel.aggregate([


        {
            $match: {
                Product: ObjectId(req.body.ProductId)
            }
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
                localField: 'Customer',
                foreignField: '_id',
                as: 'Customer'
            },
        },
        {
            $lookup:
            {
                from: 'subscriptions',
                localField: 'Subscription',
                foreignField: '_id',
                as: 'Subscription'
            },
        },

    ])
    console.log(Data)
    if (Data[0]) {

        return res.status(200).json({
            success: true, message: "Data Found", Data
        })

    }
    else {
        return next(new Error('Data Not Found'))

    }




})

//GetCollections Account by Operator
exports.GetByOperator = catchAsync(async (req, res, next) => {



    const Data = await CollectionModel.aggregate([


        {
            $match: {
                Operator: ObjectId(req.body.OperatorId)
            }
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
                localField: 'Customer',
                foreignField: '_id',
                as: 'Customer'
            },
        },
        {
            $lookup:
            {
                from: 'subscriptions',
                localField: 'Subscription',
                foreignField: '_id',
                as: 'Subscription'
            },
        },

    ])
    console.log(Data)
    if (Data[0]) {

        return res.status(200).json({
            success: true, message: "Data Found", Data
        })

    }
    else {
        return next(new Error('Data Not Found'))

    }




})


//GetByDateRange
exports.GetByDateRange = catchAsync(async (req, res, next) => {


    console.log("==>", new Date(req.body.StartDate), "==>", new Date(req.body.EndDate))
    // const Data = await CollectionModel.find({
    //     CollectionDate: { $gt: new Date(req.body.StartDate), $lt: new Date(req.body.EndDate) }
    // })
    const Data = await CollectionModel.aggregate([
    {
        $match: {
            CollectionDate: { $gt: new Date(req.body.StartDate), $lt: new Date(req.body.EndDate) }
        }
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
                localField: 'Customer',
                foreignField: '_id',
                as: 'Customer'
            },
        },
        {
            $lookup:
            {
                from: 'subscriptions',
                localField: 'Subscription',
                foreignField: '_id',
                as: 'Subscription'
            },
        },
        ])

    console.log("Data==>", Data)
    if (Data[0]) {

        return res.status(200).json({
            success: true, message: "Data Found", Data
        })

    }
    else {
        return next(new Error('No Data Found'))

    }




})

async function CashRegisterHandler(Data){

    const CashRegister = await SubscriptionModel.find({"_id": Data.Subscription})
    let index ;
    CashRegister[0].CashRegister.map((x,i)=>{
        if(x.DateOfCollection >= new Date(Data.CollectionDate))
        {
            if (!index){ index = i;}
            
        }
    })
    console.log(index,CashRegister[0].CashRegister[index].Status)
    if (CashRegister[0].CashRegister[index].Status == "Collected")
    {
        return false
    }
    else
    {console.log("index", index)
    CashRegister[0].CashRegister[index].Status ="Collected"
    await CashRegister[0].save()

    return true}

}
