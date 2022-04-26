const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
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
    password:{
        type:String,
        required:true
    },
});
    new_mongoose.pre("save", async function(next){
        if(this.isModified("password")){
            this.password = await bcrypt.hash(this.password,10);
        }
    next();
    })    
const register = new mongoose.model("register", new_mongoose);
module.exports=register;