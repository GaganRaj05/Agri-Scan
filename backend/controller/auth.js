const User = require("../models/Users")
const bcrypt = require('bcryptjs');
const jsonwebtoken = require("jsonwebtoken")

async function handleRegistration(req, res) {
    try {
        const {name,phone_no,email,password,dob,farm_type,state,district,address} = req.body;
        console.log("working")
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        await User.create({
            name:name,
            phone_no:phone_no,
            email:email,
            password:hashedPassword,
            dob:dob,
            farm_type:farm_type,
            state:state,
            district:district,
            address:address           
        });

        return res.status(201).json("Registration successfull");
    }
    catch(err) {
        console.log(err.message);
        return res.status(501).json("Some error occured please try again later");
    }
}

async function handleLogin(req, res) {
    try {
        const {email, password} = req.body;
        const emailExists = await User.findOne({email:email});
        if(!emailExists) return res.status(401).json("Email does not exist, please check your email");
        const result = await bcrypt.compare(password,await emailExists.password);
        if(!result) return res.status(401).json("Incorrect password entered");

        const token = jsonwebtoken.sign({user_id:emailExists.id},process.env.JWT_SECRET,{expiresIn:"2h"});
        res.cookie("jwt",token,{
            httpOnly:false,
            secure:false,
            sameSite:"lax",
            path:"/"
        })
        return res.status(201).json("Login successfull")
    }
    catch(err) {
        console.log(err);
        return res.status(501).json("Some error occured please try again later");
    } 
}
module.exports = {handleLogin,handleRegistration}