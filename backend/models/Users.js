const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    phone_no: {
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    dob: {
        type:Date,
        required:true,
    },
    state: {
        type:String,
        required:true,
    },
    district: {
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    }
});

const User = mongoose.model(userSchema);

module.exports = User;