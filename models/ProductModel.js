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
    Agency: {
        type: mongoose.Types.ObjectId,
        ref: 'Agency',
    },
    Operator: {
        type: mongoose.Types.ObjectId,
        ref: 'Operator',
    },
    
},
    {
        timestamps: true,
    });


const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
