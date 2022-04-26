const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
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
    tokens:[{
        token:{
        type:String,
        required:true
        }
    }]
});
//Generating tokens
new_mongoose.methods.generateAuthToken = async function(){
    try {
        const token = jwt.sign({_id:this._id.toString()}, "mynameisrajbirsinghkhokharmanjitsingh")
        this.tokens = this.tokens.concat({token:token})
        await this.save();
        return token;
    } catch (error) {
        res.send("the error part" + error)
    }
  }
  


//Converting password into Hash
    new_mongoose.pre("save", async function(next){
        if(this.isModified("password")){
            this.password = await bcrypt.hash(this.password,10);
        }
    next();
    })    
const register = new mongoose.model("register", new_mongoose);
module.exports=register;