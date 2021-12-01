const mongoose = require("mongoose");
const argon2 = require('argon2');

const AdminSchema = new mongoose.Schema({
  Email: {
    type: String,
    required: [true, "Please Enter your email"],
    unique: true,
    lowercase: true,
  },
  Password: {
    type: String,
    required: [true, "Please Enter your password"],
    minLength: 8,
  }
},
  {
    timestamps: true,
  });

AdminSchema.pre('save', async function(next) {
  this.Password = await argon2.hash(this.Password);
  next();
})

AdminSchema.pre('updateOne', async function (next) {
  this.getUpdate().Password = await argon2.hash(this.getUpdate().Password); 
  next();
})


const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;
