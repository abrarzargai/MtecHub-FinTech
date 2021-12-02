const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema({
    FirstName: {
        type: String
    },
    LastName: {
        type: String
    },
    DOB: {
        type: Date
    },
    City: {
        type: String
    },
    Email: {
        type: String
    },
    Password: {
        type: String,
        default:'1234'
    },
    PhoneNumber: {
        type: String
    },
    Gender:{
        type: String,
        enum:['male', 'female']
    },
    Role: {
        type: String,
        enum: ['customer', 'collector']
    },
    NationalId:{
        type: String
    },
    ExpiryDate:{
        type: String
    },
    CashRegister: {
        type: mongoose.Types.ObjectId,
        ref: 'CashRegister',
    },
    Subscriptions: [{
        type: mongoose.Types.ObjectId,
        ref: 'Product',
    }],
    Transaction: [{
        type: mongoose.Types.ObjectId,
        ref: 'Transaction',
    }],
    Operator: {
        type: mongoose.Types.ObjectId,
        ref: 'Operator',
    },
    Agency: {
        type: mongoose.Types.ObjectId,
        ref: 'Agency',
    }
},
    {
        timestamps: true,
    });


const Member = mongoose.model("Member", MemberSchema);
module.exports = Member;
