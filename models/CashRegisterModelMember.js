const mongoose = require("mongoose");

const CashRegisterSchema = new mongoose.Schema({
    Code: {
        type: Number,
        required: true,
    },
     Label: {
        type: String,
        required: true,
    },
    Status: {
        type: String,
        enum: ['enabled', 'disabled'],
        required: true,
    },
    Currency: {
        type: String,
        enum: ['eur', 'xof'],
        required: true,
    },
    Operator: {
        type: mongoose.Types.ObjectId,
        ref: 'Operator',
    },
    Product: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
    },
    Agency: {
        type: mongoose.Types.ObjectId,
        ref: 'Agency',
    },
    TransactionType: {
        type: String,
        enum: ['debit', 'credit'],
    },
    Amount:{
        type: Number,
        default: 0.00
    },
    CancelByAdmin:{
        type:Boolean
    },
    CommentByAdmin:{
        type:String
    }
},
    {
        timestamps: true,
    });


const CashRegister = mongoose.model("CashRegister", CashRegisterSchema);
module.exports = CashRegister;
