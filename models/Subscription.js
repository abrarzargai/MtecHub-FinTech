const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema({

    Code: {
        type: String,
    },
    Name: {
        type: String,
    },
    Amount: {
        type: Number,
    },
    Balance:{
        type: Number,
    },
    Duration: {
        type: String,
        enum: ['monthly', 'bimonthly', 'quarter', 'semester', 'annual']
    },
    Status: {
        type: String,
    },
    StartDate: {
        type: Date,
    },
    EndDate: {
        type: Date,
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
        ref: 'Operator',
    },
    Agency: {
        type: mongoose.Types.ObjectId,
        ref: 'Agency',
    },  
    CashRegister:[{
        Name:{type:String},
        DateOfCollection:{type:Date},
        CollectionAmount:{type:Number},
        SubscriptionName: {type:String},
        Status:{type:String}
    }] 
},
    {
        timestamps: true,
    });


const Subscription = mongoose.model("Subscription", SubscriptionSchema);
module.exports = Subscription;
