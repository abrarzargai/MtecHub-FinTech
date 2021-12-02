const mongoose = require("mongoose");

const CashRegisterSchema = new mongoose.Schema({
    AccountNo: {
        type: String,
        required: true,
    },
    Duration: {
        type: String,
        enum: ['month', 'bimonthly', 'quarter', 'semester', 'annual'],
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
    Digits: {
        type: String,
        required: true,
    },
    Balance:{
        type: Number,
        default: 0.00
    }
},
    {
        timestamps: true,
    });


const CashRegister = mongoose.model("CashRegister", CashRegisterSchema);
module.exports = CashRegister;
