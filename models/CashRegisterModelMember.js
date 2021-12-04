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
    Product: [{
        type: mongoose.Types.ObjectId,
        ref: 'Product',
    }],
    Agency: {
        type: mongoose.Types.ObjectId,
        ref: 'Agency',
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
        default: 0.00
    },
    VerifiedByAdmin: {
        type: Boolean
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


const CashRegister = mongoose.model("CashRegisterMember", CashRegisterSchema);
module.exports = CashRegister;
