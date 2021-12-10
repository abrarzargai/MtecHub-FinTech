const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema({
   
   
    Status: {
        type: String,
    },
    StartingDate: {
        type: String,
    },
    Duration: {
        type: String,
        enum: ['monthly', 'bimonthly', 'quarter', 'semester', 'annual']
    },
    Amount: {
        type: Number,
    },
    Product: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
    },
    Member: {
        type: mongoose.Types.ObjectId,
         ref: 'Member',
    },
    Operator: {
        type: mongoose.Types.ObjectId,
        ref: 'Member',
    },
    Agency: {
        type: mongoose.Types.ObjectId,
        ref: 'Member',
    },
    Currency: {
        type: String,
        enum: ['eur', 'xof'],
    },
},
    {
        timestamps: true,
    });


const Subscription = mongoose.model("Subscription", SubscriptionSchema);
module.exports = Subscription;
