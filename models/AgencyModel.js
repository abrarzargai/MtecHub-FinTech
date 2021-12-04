const mongoose = require("mongoose");

const AgencySchema = new mongoose.Schema({
  Code: {
    type: Number,
    required: true
  },
  Label: {
    type: String,
    required: true
  },
  CashRegister: [{
    type: mongoose.Types.ObjectId,
    ref: 'CashRegisterAgency',
  }],
  Products:[{
    type: mongoose.Types.ObjectId,
    ref: 'Product',
  }],
  Operator:[{
    type: mongoose.Types.ObjectId,
    ref: 'Operator',
  }],
   Member:[{
    type: mongoose.Types.ObjectId,
    ref: 'Member',
  }]
},
  {
    timestamps: true,
  });


const Agency = mongoose.model("Agency", AgencySchema);
module.exports = Agency;
