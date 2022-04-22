const mongoose = require("mongoose");

const new_mongoose = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    
});
const register = new mongoose.model("register", new_mongoose);
module.exports=register;