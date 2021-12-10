const mongoose = require("mongoose");

const CashRegisterAgencySchema = new mongoose.Schema({
    Code: {
        type: Number,
    },
    Label: {
        type: String,
    },
    Status: {
        type: String,
    },
    Customer: {
        type: mongoose.Types.ObjectId,
        ref: 'Member',
    },
    Agency: {
        type: mongoose.Types.ObjectId,
        ref: 'Agency',
    },
    Product: [{
        type: mongoose.Types.ObjectId,
        ref: 'Product',
    }],
    Operator: {
        type: mongoose.Types.ObjectId,
        ref: 'Operator',
    },
    TransactionType: {
        type: String,
        enum: ['debit', 'credit'],
    },
    Currency: {
        type: String,
        enum: ['eur', 'xof'],
    },
    CollectionDate: {
        type: Date,
    },
    StartDate: {
        type: Date,
    },
    Amount: {
        type: Number
    },
},
    {
        timestamps: true,
    });


const CashRegisterAgency = mongoose.model("CashRegisterAgency", CashRegisterAgencySchema);
module.exports = CashRegisterAgency;
