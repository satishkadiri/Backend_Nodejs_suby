// const vendor = require('../models/Vendor')
const vendor = require('../models/Vendor')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotEnv = require('dotenv')
dotEnv.config();

const vendorRegister = async(req,res)=>{
    const  {userName,email,password} = req.body  
    try{
        const vendorEmail = await vendor.findOne({email})
        if(vendorEmail){
            return res.status(400).json("Email already used")
        }

        const hashedPassword = await bcrypt.hash(password,10)
        const newVendor = new vendor({
            userName,
            email,
            password: hashedPassword
        })
        await newVendor.save()
        res.status(201).json({message:"Vendor registered successfully"})
        console.log('registered')
        return newVendor;
    }catch(error){
        console.log("error",error)
        res.status(500).json({error:"Internal server error"})
    }
}

const vendorLogin = async (req, res) => {
    const {email,password} = req.body
    try{
        const getVendor = await vendor.findOne({email})
        console.log("getVendor",getVendor)
        if(!getVendor || !(await bcrypt.compare(password,getVendor.password))){
            return res.status(401).json({error:"Inavalid username or password"})
        }
        const secretKey = process.env.whatISYOURNAME
        const token = jwt.sign({vendorId:getVendor._id},secretKey,{expiresIn:"1h"})
        res.status(200).json({success: "Login successful",token}) 
        console.log("token",token)
    }catch(error){
        console.log("error",error) 
        res.status(401).json({error:"login failed"})
    }
}

const getAllVendors = async(req,res) => {

    try{
        const getvendors = await vendor.find({})
        console.log("getvendors",getvendors)
        res.json({getvendors})
    }catch(error){
        console.log(error)
        res.status(500).json({error:"Internal server error"})
    }
}

const getVendorById = async(req,res) => {

    try{
        const getvendor = await vendor.findOne(req.params.id)
        console.log("getvendor",getvendor)
        if(!getvendor){
            return res.status(404).json({error:"vendor not found"})
        }
        console.log("getvendor",getvendor)
        res.status(200).json({getvendor})
    }catch(error){
        console.log(error)
        res.status(500).json({error:"Internal server error"})
    }
}
module.exports = {vendorRegister,vendorLogin,getAllVendors,getVendorById} 