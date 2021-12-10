const CollectionModel = require('../models/CollectionModel');
const MemberModel = require('../models/MemberModel');
const AgencyModel = require('../models/AgencyModel');
const OperatorModel = require('../models/OperatorModel');
const SubscriptionModel = require('../models/Subscription');
const CashRegisterMemberModel = require('../models/CashRegisterModelMember');
const CashRegisterAgencyModel = require('../models/CashRegisterAgencyModel');
const catchAsync = require('../utils/catchAsync');
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;


/***************Services************/

//Add
exports.Add = catchAsync(async (req, res, next) => {


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
    const Data = await CollectionModel.find({
        CollectionDate: { $gt: new Date(req.body.StartDate), $lt: new Date(req.body.EndDate) }
    })

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

//SettleCollectionAccount
exports.SettleCollectionAccount = catchAsync(async (req, res, next) => {

    const MemberCashRegister = await CashRegisterMemberModel.find({
        Member: ObjectId(req.body.MemberId),
        Product: ObjectId(req.body.ProductId)

    })
    console.log("MemberCashRegister", MemberCashRegister)
    const TransactionAmount = MemberCashRegister[0].Amount
    console.log("TransactionAmount", TransactionAmount)
    MemberCashRegister[0].Amount = 0;
    MemberCashRegister[0].save()
    if (TransactionAmount > 0) {
        const AgencyCashRegister = await CashRegisterAgencyModel.find({
            Product: ObjectId(req.body.ProductId),
            Customer: ObjectId(req.body.MemberId)

        })
        console.log("AgencyCashRegister==>", AgencyCashRegister)
        AgencyCashRegister[0].Amount = TransactionAmount;
        AgencyCashRegister[0].save()

        const Record = await CollectionModel.updateOne({
            "_id": req.body.CollectionId
        }, { Status: "Closed", CancelByAdmin: false, CommentByAdmin: "" });

        console.log("Record==>", Record)
        if (Record.nModified > 0) {
            return res.status(200).json({
                success: true, message: "Transaction Done Successfully"
            })
        }
        return res.status(500).json({
            success: false, message: "Error!  Try Again"
        })
    } else {
        return res.status(500).json({
            success: false, message: "Error!  User have Not enough Credit"
        })
    }
})
//SettleCollectionAccount
exports.CancelTransaction = catchAsync(async (req, res, next) => {

    const AgencyCashRegister = await CashRegisterAgencyModel.find({
        Product: ObjectId(req.body.ProductId),
        Customer: ObjectId(req.body.MemberId)

    })

    console.log("AgencyCashRegister==>", AgencyCashRegister)
    const TransactionAmount = AgencyCashRegister[0].Amount
    console.log("AgencyCashRegister", AgencyCashRegister)
    AgencyCashRegister[0].Amount = 0;
    AgencyCashRegister[0].save()

    if (TransactionAmount > 0) {
       

        const MemberCashRegister = await CashRegisterMemberModel.find({
            Member: ObjectId(req.body.MemberId),
            Product: ObjectId(req.body.ProductId)

        })
        console.log("MemberCashRegister", MemberCashRegister)
        MemberCashRegister[0].Amount = TransactionAmount;
        MemberCashRegister[0].save()



        const Record = await CollectionModel.updateOne({
            "_id": req.body.CollectionId
        }, { Status: "Cancel", CancelByAdmin: true, CommentByAdmin: req.body.Comment });

        console.log("Record==>", Record)
        if (Record.nModified > 0) {
            return res.status(200).json({
                success: true, message: "Transaction CancelByAdmin Successfully"
            })
        }
        return res.status(500).json({
            success: false, message: "Error!  Try Again"
        })
    } else {
        return res.status(500).json({
            success: false, message: "Error!  Agency have Not enough Credit"
        })
    }
})