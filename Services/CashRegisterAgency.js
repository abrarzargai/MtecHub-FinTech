const CashRegisterAgencyModel = require('../models/CashRegisterAgencyModel');
const AgencyModel = require('../models/AgencyModel');
const catchAsync = require('../utils/catchAsync');



/***************Services************/


//Add
exports.Add = catchAsync(async (req, res, next) => {

    const Record = await CashRegisterAgencyModel.create({ ...req.body })
    console.log("Record", Record)
    if (!Record) {
        throw new Error('Error! CashRegister cannot be created');
    }
    else {
        const Agency = await AgencyModel.find({ "_id": req.body.Member })
        console.log("Member Found===", Agency)
        if (Agency[0]) {
            Agency[0].CashRegister.push(Record._id);
            const save = await Member[0].save()
        }
        return res.status(201).json({
            success: true, message: "CashRegister Created Successfully", Record
        })
    }


})

//Update Cash Register
exports.UpdateStatus = catchAsync(async (req, res, next) => {

    try {
       
        const Record = await CashRegisterAgencyModel.updateOne({ "_id": req.body.CashRegisterAgency }, 
            { ...req.body });
        console.log(Record.nModified)
            if (Record.nModified > 0) {
                return res.status(200).json({
                    success: true, message: "Cash Register  Updated Successfully"
                })
            }
            return res.status(500).json({
                success: false, message: "Error!  Cash Register  Not-Updated Successfully"
            })
        
       
    }
    catch(error) {
        console.log("error", error)
        return next(new Error('Cash Register with this ID Not Found'))

    }

})

//Delete
exports.Delete = catchAsync(async (req, res, next) => {

    try {

        const Record = await CashRegisterAgencyModel.deleteOne({"_id": req.body.CashRegisterAgency})
        console.log("delete",Record)
        if (Record.deletedCount > 0) {
            return res.status(200).json({
                success: true, message: "Cash Register Deleted Successfully"
            })
        }
        return res.status(500).json({
            success: false, message: "Error!  Cash Register with this ID Not Found"
        })


    }
    catch (error) {
        console.log("error", error)
        return next(new Error('Error! Cash Register with this ID Not Found'))

    }

})

//GetALL
exports.GetALL = catchAsync(async (req, res, next) => {

    

    const Data = await CashRegisterAgencyModel.aggregate([
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

