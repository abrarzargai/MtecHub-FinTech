const ProductsModel = require('../models/ProductModel');
const catchAsync = require('../utils/catchAsync');

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

    const Data = await ProductsModel.find({ "_id": req.body.Product  })
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


