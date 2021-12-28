const mongoose = require("mongoose");

const CollectionSchema = new mongoose.Schema({

    Amount: {
        type: Number,
    },
    Customer: {
        type: mongoose.Types.ObjectId,
        ref: 'Member',
    },
    Product: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
    },
    CollectionDate: {
        type: Date,
    },
    Subscription: {
        type: mongoose.Types.ObjectId,
        ref: 'Subscription',
    },
    Agency: {
        type: mongoose.Types.ObjectId,
        ref: 'Agency',
    },
    Operator: {
        type: mongoose.Types.ObjectId,
        ref: 'Operator',
    },
    Status: {
        type: String,
        default: "Collected"
    },
},
    {
        timestamps: true,
    });


const Collection = mongoose.model("Collection", CollectionSchema);
module.exports = Collection;
