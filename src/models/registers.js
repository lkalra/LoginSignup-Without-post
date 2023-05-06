const mongoose = require("mongoose")
const { Schema } = mongoose;

const eSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String, 
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    confirmpassword:{
        type:String,
        required:true,
    }
},{versionKey:false})


const Register = new mongoose.model("Register", eSchema)

module.exports=Register