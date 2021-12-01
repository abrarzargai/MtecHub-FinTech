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

