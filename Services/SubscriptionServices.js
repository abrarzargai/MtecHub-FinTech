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

    // Handling CashRegister here 
    const CashRegisterArray = [] //initializaied Empty Array for CashRegister
    const User = await MemberModel.find({ "_id": req.body.Member }) //used to find UserName
    //used to find the price according to Per Day
    const Price = await PriceCalHandler(new Date(req.body.StartDate), new Date(req.body.EndDate), req.body.Amount)

    //used to make CashRegister Array
    const start = new Date(req.body.StartDate);
    const end = new Date(req.body.EndDate);
    let loop = new Date(start);
    while (loop <= end) {
        console.log(loop);

        CashRegisterArray.push({
            Name: User[0].FirstName + ' ' + User[0].LastName,
            DateOfCollection: loop,
            CollectionAmount: Price.toFixed(3),
            SubscriptionName: req.body.Name,
            Status: 'Pending'
        })
        let newDate = loop.setDate(loop.getDate() + 1);
        loop = new Date(newDate);
    }
    console.log("--------------", CashRegisterArray)

    //adding new subscription to db
    const Subscription = await SubscriptionModel.create({ ...req.body, CashRegister: CashRegisterArray })
    console.log("Subscription", Subscription)
    if (!Subscription) {
        throw new Error('Error!Subscription Cannot Be Created ')
    }

    //calling User and storing productID to user subscription
    const UserData = await MemberModel.find({ "_id": req.body.Member })
    console.log("User Found", UserData)
    UserData[0].Subscriptions.push(Subscription._id)
    await UserData[0].save()
    return res.status(201).json({
        success: true, message: "Product Subscribed Successfully"
    })






})


//update

exports.Update = catchAsync(async (req, res, next) => {


    const Record = await SubscriptionModel.updateOne({ "_id": req.body.SubscriptionId }, { ...req.body });
    console.log("Update Record", Record)

    if (Record.nModified > 0) {
        return res.status(200).json({
            success: true, message: " Updated Successfully"
        })
    }
    return res.status(500).json({
        success: false, message: "Error! Not-Updated "
    })

})

//GetAllByAgency
exports.GetAllByAgency = catchAsync(async (req, res, next) => {

    const Data = await SubscriptionModel.aggregate([
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
                from: 'members',
                localField: 'Member',
                foreignField: '_id',
                as: 'Member'
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
            $match: { Agency: ObjectId(req.body.AgencyId) }
        }

    ])
    console.log(Data)
    if (Data[0]) {

        return res.status(200).json({
            success: true, message: "Data Found", Data
        })

    }
    else {
        return next(new Error('No Data Found'))

    }
})


//GetAllByMember
exports.GetAllByMember = catchAsync(async (req, res, next) => {

    const Data = await SubscriptionModel.aggregate([
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
        {
            $match: { Member: ObjectId(req.body.MemberId) }
        }

    ])
    console.log(Data)
    if (Data[0]) {

        return res.status(200).json({
            success: true, message: "Data Found", Data
        })

    }
    else {
        return next(new Error('No Data Found'))

    }
})

//GetAllByOperator
exports.GetAllByOperator = catchAsync(async (req, res, next) => {

    const Data = await SubscriptionModel.aggregate([
        {
            $match: { Operator: ObjectId(req.body.OperatorId) }
        },
        {
            $group: { _id: "$Member", count: { $sum: 1 } }
        },
    ])

    const Response = await OperatorSubscriptionHandler(Data)
    if (Data[0]) {

        return res.status(200).json({
            success: true, message: "Data Found", Response
        })

    }
    else {
        return next(new Error('No Data Found'))

    }
})

//GetOne
exports.GetOne = catchAsync(async (req, res, next) => {

    const Data = await SubscriptionModel.aggregate([
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
        {
            $lookup:
            {
                from: 'members',
                localField: 'Member',
                foreignField: '_id',
                as: 'Member'
            },
        },
        {
            $match: { _id: ObjectId(req.body.SubscriptionId) }
        }

    ])
    console.log(Data)
    if (Data[0]) {

        return res.status(200).json({
            success: true, message: "Data Found", Data
        })

    }
    else {
        return next(new Error('No Data Found'))

    }
})


exports.GetQuerry = catchAsync(async (req, res, next) => {


    const Data = await SubscriptionModel.find({
        Operator: req.body.OperatorId,
        CashRegister: {
            $elemMatch: { DateOfCollection: new Date(req.body.Date) }
        }
    })

    const promises = Data.map((x) => {

        var CashRegister
        x.CashRegister.map((a) => {
            if (!CashRegister) {
                if (a.DateOfCollection >= new Date(req.body.Date)) {

                    CashRegister = { Name: a.Name, DateOfCollection
                        : a.DateOfCollection, CollectionAmount
                            : a.CollectionAmount, SubscriptionName
                            : a.SubscriptionName, Status: a.Status}

                }
            }
        })
        
        return {
            ...CashRegister, Operator: x.Operator, Member: x.Member, Product: x.Product,
            Agency: x.Agency, Code: x.Code, Subscription:x._id
        }
    })

    const APIData = await Promise.all(promises)
    if (Data[0]) {

        return res.status(200).json({
            success: true, message: "Data Found", Data: APIData
        })

    }
    else {
        return next(new Error('No Data Found'))

    }
})

async function PriceCalHandler(start, end, Amount) {

    let loop = new Date(start);
    let Total = 0
    while (loop <= end) {
        Total = Total + 1
        let newDate = loop.setDate(loop.getDate() + 1);
        loop = new Date(newDate);
    }
    return Amount / Total

}

async function OperatorSubscriptionHandler(data) {
    console.log("OperatorSubscription==>", data)
    let i = 0
    const promises = await data.map(async (x) => {
        i = i + 1;
        console.log("x", x)
        const Record = await SubscriptionModel.aggregate([
            { $match: { Member: ObjectId(x._id) } },
            { $lookup: { from: 'products', localField: 'Product', foreignField: '_id', as: 'Product' }, },
            { $lookup: { from: 'agencies', localField: 'Agency', foreignField: '_id', as: 'Agency' }, },
            { $lookup: { from: 'members', localField: 'Member', foreignField: '_id', as: 'Member' }, },
            { $lookup: { from: 'operators', localField: 'Operator', foreignField: '_id', as: 'Operator' }, },
        ])
        return {

            Code: i,
            Label: Record[0].Member[0].FirstName + ' ' + Record[0].Member[0].LastName,
            TotalSub: x.count,
            Record: Record

        }
    })

    let APIResponse = await Promise.all(promises)


    return APIResponse


}

