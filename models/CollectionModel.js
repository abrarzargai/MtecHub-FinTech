const mongoose = require("mongoose");

const CollectionSchema = new mongoose.Schema({
    Code: {
        type: Number,
    },
    Customer: {
        type: mongoose.Types.ObjectId,
        ref: 'Member',
    },
    CollectionDate: {
        type: Date,
    },
    Product: {
        type: mongoose.Types.ObjectId,
        ref: 'product',
    },
    Agency: {
        type: mongoose.Types.ObjectId,
        ref: 'Agency',
    },
    Operator: {
        type: mongoose.Types.ObjectId,
        ref: 'Operator',
    },
    StartingDate: {
        type: Date,
    },
    Status: {
        type: String,
        default: "pending"
    },
},
    {
        timestamps: true,
    });


const Collection = mongoose.model("Collection", CollectionSchema);
module.exports = Collection;
