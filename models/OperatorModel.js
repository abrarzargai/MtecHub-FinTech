const mongoose = require("mongoose");
const argon2 = require('argon2');

const OperatorSchema = new mongoose.Schema({
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
        default: '1234'
    },
    PhoneNumber: {
        type: String
    },
    Gender: {
        type: String,
        enum: ['male', 'female']
    },
    NationalId: {
        type: String
    },
    Image: {
        type: String
    },
    ExpiryDate: {
        type: Date
    },
    Member: [{
        type: mongoose.Types.ObjectId,
        ref: 'Member',
    }],
    Agency: {
        type: mongoose.Types.ObjectId,
        ref: 'Agency',
    }
},
    {
        timestamps: true,
    });

OperatorSchema.pre('save', async function (next) {
    this.Password = await argon2.hash(this.Password);
    next();
})

OperatorSchema.pre('updateOne', async function (next) {
    console.log("update", this.getUpdate())
    this.getUpdate().Password = await argon2.hash(this.getUpdate().Password);
    next();
})

const Operator = mongoose.model("Operator", OperatorSchema);
module.exports = Operator;
