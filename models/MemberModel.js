const mongoose = require("mongoose");
const argon2 = require('argon2');

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
    Gender: {
        type: String
    },
    NationalId:{
        type: String
    },
    Image: {
        type: String
    },
    ExpiryDate:{
        type: String
    },
    CashRegister: [{
        type: mongoose.Types.ObjectId,
        ref: 'CashRegisterMember',
    }],
    Subscriptions: [{
        type: mongoose.Types.ObjectId,
        ref: 'Product',
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

MemberSchema.pre('save', async function (next) {
    this.Password = await argon2.hash(this.Password);
    next();
})

MemberSchema.pre('updateOne', async function (next) {
    console.log("update", this.getUpdate())
    this.getUpdate().Password = await argon2.hash(this.getUpdate().Password);
    next();
})

const Member = mongoose.model("Member", MemberSchema);
module.exports = Member;
