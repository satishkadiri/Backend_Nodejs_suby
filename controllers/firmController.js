const Firm = require('../models/Firm1')
const Vendor = require('../models/Vendor')
const multer = require('multer')

const addFirm = async(req,res)=>{
    try{
        const {firmName,area,category,region,offer} = req.body;
        const image = req.file ? req.file.filenmae: undefined;
        console.log("Hi satya")
        const getVendor = await Vendor.findById(req.vendorId)
        console.log("getVendor",getVendor)
        if(!getVendor){
            console.log("getVendor",getVendor)
            return res.status(404).json({message:"vendor not found"})
        }
        const firm = new Firm({
            
            firmName,area,category,region,offer,image,vendor:getVendor._id
        })
        console.log(firm)
        // await firm.save()
        const savedFirm = await firm.save()
        getVendor.firm.push(savedFirm)
        await getVendor.save()
        return res.status(200).json({message:"Firm Added successfully"})


    }catch(error){
        console.error(error)
        res.status(500).json("Internal server error")
    }
    }

    const deleteFirmById = async(req,res)=>{
        try{
            const firmId = req.params.firmId
            const deleteFirm = await Firm.findByIdAndDelete(firmId);
            if(!deleteFirm){
                return res.status(404).json({error:"no firm found"})
            }

        }catch(error){
            console.error("error",error)
        }    
    }
    const storage = multer.diskStorage({
        destination: function(req,file,cb){
            cb(null,'uploads/');
        },
        filename: function(req,file,cb){
            cb(null,Date.now()+ Path2D.extname(file.originalname));
        }
    })
    const upload = multer({storage:storage});
    
    module.exports = {addFirm:[upload.single('image'),addFirm], deleteFirmById}
    // module.exports = {addFirm}