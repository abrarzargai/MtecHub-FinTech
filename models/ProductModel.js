const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    Code: {
        type: Number,
    },
    Label: {
        type: String,
    },
    Duration: {
        type: String,
        enum: ['monthly', 'bimonthly', 'quarter', 'semester', 'annual']
    },
    Status: {
        type: String,
        enum: ['enabled', 'disabled']
    },
    Price: {
        type: Number,
    },
    
},
    {
        timestamps: true,
    });


const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
