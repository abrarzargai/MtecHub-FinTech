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

    try {
        //Checking if user already subscribed this product
        const AlreadySubscribeItems = await SubscriptionModel.aggregate([
            {
                $match:
                {
                    Member: ObjectId(req.body.MemberId), Product: ObjectId(req.body.productId)
                }
            }
        ])
        console.log("Log==>", AlreadySubscribeItems)
        console.log("Log==>", AlreadySubscribeItems.length)

        if (AlreadySubscribeItems.length>0) {
            return next(new Error('You have Already subscribed this Item '))
        }

        //adding new subscription to db
        const Subscription = await SubscriptionModel.create({
            Status: req.body.SubscriptionStatus,
            Duration: req.body.SubscriptionDuration,
            Price: req.body.Amount,
            Product: req.body.productId,
            Member: req.body.MemberId,
            Operator: req.body.OperatorId,
            Agency: req.body.AgencyId,
            SubscribedBy: req.body.SubscribedBy,
        })
        console.log("Subscription", Subscription)
        if (Subscription) {
            //calling User and storing productID to user subscription
            const User = await MemberModel.find({ "_id": req.body.MemberId })
            console.log("User Found", User)
            User[0].Subscriptions.push(Subscription._id)
            const save = await User[0].save()
            console.log("save", save)

            const usercashregisterdata = {
                Code: req.body.UserCashRegisterCode,
                Label: req.body.UserCashRegisterLabel,
                Status: req.body.UserCashRegisterStatus,
                Currency: req.body.Currency,
                Operator: req.body.OperatorId,
                Product: req.body.productId,
                Agency: req.body.AgencyId,
                Member: req.body.MemberId,
                TransactionType: "debit",
                Amount: req.body.Amount,
            }
            const UserRegister = await UserCashRegisterHandler(usercashregisterdata)
            console.log("UserRegister Response", UserRegister)

            if (UserRegister) {
                const Agencycashregisterdata = {
                    Code: req.body.AgencyCashRegisterCode,
                    Label: req.body.AgencyCashRegisterLabel,
                    Status: req.body.AgencyCashRegisterStatus,
                    Customer: req.body.MemberId,
                    Agency: req.body.AgencyId,
                    Product: req.body.productId,
                    Operator: req.body.OperatorId,
                    TransactionType: "credit",
                    Currency: req.body.Currency,
                    CollectionDate: req.body.AgencyCashRegisterCollectionDate,
                    StartDate: req.body.AgencyCashRegisterStartDate,
                    Amount: req.body.Amount,
                }
                const AgencyRegister = await AgencyCashRegisterHandler(Agencycashregisterdata)
                console.log("UserRegister Response", AgencyRegister)

                if (AgencyRegister) {
                    return res.status(201).json({
                        success: true, message: "Product Subscribed Successfully"
                    })
                }
            }

            return next(new Error('Error! cannot Subscribe the product right Now,Please Try Later'))


        }

    } catch (error) {
        console.log("Error", error)
        return next(new Error('Error! cannot Subscribe the product right Now,Please Try Later'))
    }
})

async function UserCashRegisterHandler(data) {
    const Record = await CashRegisterMemberModel.create({ ...data })
    console.log("Record", Record)
    if (!Record) {
        throw new Error('Error! CashRegister cannot be created');
    }
    else {
        const Member = await MemberModel.find({ "_id": data.Member })
        console.log("Member Found===", Member)
        if (Member[0]) {
            Member[0].CashRegister.push(Record._id);
            const save = await Member[0].save()
        }

        return true
    }

}

async function AgencyCashRegisterHandler(data) {
    const Record = await CashRegisterAgencyModel.create({ ...data })

    if (!Record) {
        throw new Error('Error! CashRegister cannot be created');
    }
    else {
        const Agency = await AgencyModel.find({ "_id": data.Agency })
        console.log("Agency Found===", Agency)
        if (Agency[0]) {
            Agency[0].CashRegister.push(Record._id);
            const save = await Agency[0].save()
            console.log("save", save)
        }
        return true
    }

}

//update

exports.Update = catchAsync(async (req, res, next) => {

    
    const Record = await SubscriptionModel.updateOne({ "_id": req.body.Id }, { ...req.body });
    console.log("Update Record", Record )

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
            $match: { _id: ObjectId(req.body.Id) }
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