const mongoose = require("mongoose");

const CashRegisterSchema = new mongoose.Schema({
    Customer: {
         type: mongoose.Types.ObjectId,
        ref: 'Member',
    },
    Product: {
         type: mongoose.Types.ObjectId,
        ref: 'Product',
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
        type: Number,
        default: 0.00
    }
},
    {
        timestamps: true,
    });


const CashRegister = mongoose.model("CashRegister", CashRegisterSchema);
module.exports = CashRegister;
