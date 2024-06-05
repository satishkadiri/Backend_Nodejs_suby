const vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken')
const dotEnv = require('dotenv')

dotEnv.config()
const secretKey = process.env.whatISYOURNAME
const VerifyToken = async(req,res,next) =>{
    const token = req.headers.token|| req.headers.bearer;
    if(!token){
        return res.status(401).json({error:"Token is required"})
    }
    try{
        const decoded = jwt.verify(token,secretKey)
        const getVendor = await vendor.findById(decoded.vendorId)
    
        if(!getVendor){
            return res.status(404).json({error:"vendor not found"})
        }

        req.vendorId = getVendor._id 
        next()
    }catch(error){
        return res.status(500).json({error:"Internal server error"})
    }
}
module.exports = VerifyToken