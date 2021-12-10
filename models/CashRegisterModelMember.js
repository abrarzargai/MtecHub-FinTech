const mongoose = require("mongoose");

const CashRegisterSchema = new mongoose.Schema({
    Code: {
        type: Number,
    },
     Label: {
        type: String,
    },
    Status: {
        type: String,
        enum: ['enabled', 'disabled'],
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
