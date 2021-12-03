const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    Code: {
        type: Number,
        required: true,
    },
    Label: {
        type: String,
        required: true,
    },
    Duration: {
        type: String,
        enum: ['monthly', 'bimonthly', 'quarter', 'semester', 'annual'],
        required: true,
    },
    Status: {
        type: String,
        enum: ['enabled', 'disabled'],
        required: true,
    },
    
},
    {
        timestamps: true,
    });


const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
