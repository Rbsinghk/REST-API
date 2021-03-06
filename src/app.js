const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const { default: mongoose } = require("mongoose");
const app = express();
require("./db/conn");
const register = require("./models/register");
const bcrypt = require("bcrypt")
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/register", async (req,res)=>{
    try {
        const get = await register.find({});
        res.status(201).send(get)
    } catch (error) {
        res.status(400).send(error)
    }
})

app.get("/register/:id", async (req,res)=>{
    try {
        const _id = req.params.id;
        const get1 = await register.findById({_id});
        res.send(get1)
    } catch (error) {
        res.status(400).send(error)
    }
})

app.patch("/register/:id", async (req,res)=>{
    try {
        const _id = req.params.id;
        const update = await register.findByIdAndUpdate(_id,req.body,{
            new:true
        });
        res.send(update)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.delete("/register/:id", async (req,res)=>{
    try {
        const del = await register.findByIdAndDelete(req.params.id)
        res.send(del)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.post("/register", async (req,res)=>{
    try {
        const new_register = new register(req.body);
        const token = await new_register.generateAuthToken()
        const reg = await new_register.save();

        res.status(201).send(reg);
    } catch (error) {
        res.status(400).send(error)
    }
    
})

app.post("/login", async (req,res)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;
    
        const usermail = await register.findOne({ email: email });
        
        const isMatch = await bcrypt.compare(password, usermail.password);
        console.log(isMatch)
        
        const token = await usermail.generateAuthToken();
        console.log(token);
    
        if (isMatch) {
          res.status(201).send("Successfully login");
        } else {
          res.send("Invalid Username or Password");
        }
      } catch (error) {
        res.status(400).send("Invalid email");
      }
    });
    
app.listen(port,()=>{
    console.log(`The port is running at ${port}`);
})