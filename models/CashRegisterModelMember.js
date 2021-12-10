const mongoose = require("mongoose");

const CashRegisterSchema = new mongoose.Schema({
  
    Status: {
        type: String,
    },
    Currency: {
        type: String,
        enum: ['eur', 'xof'],
    },
    Operator: {
        type: mongoose.Types.ObjectId,
        ref: 'Operator',
    },
    Product: [{
        type: mongoose.Types.ObjectId,
        ref: 'Product',
    }],
    Agency: {
        type: mongoose.Types.ObjectId,
        ref: 'Agency',
    },
    Duration: {
        type: String,
        enum: ['monthly', 'bimonthly', 'quarter', 'semester', 'annual']
    },
    Member: {
        type: mongoose.Types.ObjectId,
        ref: 'Member',
    },
    TransactionType: {
        type: String,
        enum: ['debit', 'credit'],
    },
    Amount:{
        type: Number,
    },
},
    {
        timestamps: true,
    });


const CashRegister = mongoose.model("CashRegisterMember", CashRegisterSchema);
module.exports = CashRegister;
