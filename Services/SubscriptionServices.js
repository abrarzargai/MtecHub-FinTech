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


    //Checking if user already subscribed this product
    const AlreadySubscribeItems = await SubscriptionModel.find(
        {

            Member: ObjectId(req.body.Member)

        }
    )
    console.log("Log==>", AlreadySubscribeItems[0])
    if (AlreadySubscribeItems[0]) {
        if (AlreadySubscribeItems[0].Product == req.body.Product) {
            return next(new Error('You have Already subscribed this Item '))
        }
    }

    //adding new subscription to db
    const Subscription = await SubscriptionModel.create({ ...req.body })
    console.log("Subscription", Subscription)
    if (Subscription) {
        //calling User and storing productID to user subscription
        const User = await MemberModel.find({ "_id": req.body.Member })
        console.log("User Found", User)
        User[0].Subscriptions.push(Subscription._id)
        const save = await User[0].save()
        console.log("save", save)


        return res.status(201).json({
            success: true, message: "Product Subscribed Successfully"
        })



    }




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

//GetAllByMember
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