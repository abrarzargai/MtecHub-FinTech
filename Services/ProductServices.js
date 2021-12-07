const ProductsModel = require('../models/ProductModel');
const catchAsync = require('../utils/catchAsync');

const AgencyModel = require('../models/AgencyModel');
/***************Services************/

//Add
exports.Add = catchAsync(async (req, res, next) => {

    const Data = await ProductsModel.find({ Label: req.body.Label })
    if (Data.length < 1) {

        const Record = await ProductsModel.create({ ...req.body })
        console.log("Record", Record)
        if (!Record) {
            throw new Error('Error! Product cannot be created');
        }
        else {

            const responseAgency = await AgencyModel.find({ "_id": req.body.Agency })
            console.log(responseAgency)
            responseAgency[0].Products.push(Record._id)
            const saveAgency = await responseAgency[0].save()
            console.log("saveAgency", saveAgency)

            return res.status(201).json({
                success: true, message: "New Product Added Successfully", Record
            })
        }

    }
    else {
        return next(new Error('Error! Product with this Label already exist'))

    }

})


//Update
exports.Update = catchAsync(async (req, res, next) => {

    const Data = await ProductsModel.find({ "_id": req.body.Product })
    console.log(Data)
    if (Data[0]) {


        const Record = await ProductsModel.updateOne({ "_id": req.body.Product }, { ...req.body });

        if (Record.nModified > 0) {
            return res.status(200).json({
                success: true, message: "Product Updated Successfully"
            })
        }
        return res.status(500).json({
            success: false, message: "Error!  Product Not-Updated Successfully"
        })


    }
    else {
        return next(new Error('Product Not Found '))

    }
})

//GetAll
exports.GetAll = catchAsync(async (req, res, next) => {

    const Data = await ProductsModel.find()

    if (Data[0]) {

        return res.status(200).json({
            success: true, message: "Products Found", Data
        })

    }
    else {
        return next(new Error('No Products Found'))

    }
})


exports.Delete = catchAsync(async (req, res, next) => {

    console.log("hit ",)
    try {

        const Agency = await AgencyModel.find({ "_id": req.body.Agency })
        console.log("Agency Found===>>>", Agency)
        if (Agency[0]) {
            const index = await Agency[0].Products.indexOf(req.body.Product);
            console.log("index===", index)
            Agency[0].Products.splice(index, 1)
            const save = await Agency[0].save()
            const Record = await ProductsModel.deleteOne({ "_id": req.body.Product })
            console.log("delete", Record)
            if (Record.deletedCount > 0) {
                return res.status(200).json({
                    success: true, message: "Product Deleted Successfully"
                })
            }
            return res.status(500).json({
                success: false, message: "Error! Product Not Found"
            })

        }


        return res.status(500).json({
            success: false, message: "Error! Product Not Found"
        })


    }
    catch (error) {
        console.log("error", error)
        return next(new Error('Error! Cash Register with this ID Not Found'))

    }

})

//GetOne
exports.GetOne = catchAsync(async (req, res, next) => {

    const Data = await ProductsModel.find({"_id":req.body.Id})

    if (Data[0]) {

        return res.status(200).json({
            success: true, message: "Products Found", Data
        })

    }
    else {
        return next(new Error('No Products Found'))

    }
})
