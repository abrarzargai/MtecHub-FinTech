const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema({
   
    Status: {
        type: String,
    },
    Duration: {
        type: String,
        enum: ['monthly', 'bimonthly', 'quarter', 'semester', 'annual']
    },
    Price: {
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
    SubscribedBy:{
        type: String,
        enum: ['member', 'operator']
    }
},
    {
        timestamps: true,
    });


const Subscription = mongoose.model("Subscription", SubscriptionSchema);
module.exports = Subscription;
