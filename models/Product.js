const mongoose = require("mongoose")
const Schema = mongoose.Schema

const productSchema = new Schema({
    productName : {
        type:String,
        required:true
    },
    price : {
        type:String,
        required:true
    },
    productName : {
        type:String,
        required:true
    },
    category : {
        type:[{
            type:String,
            enum:['veg','non-veg']
        }]
       
    },
    image : {
        type:String,
    },
    bestSeller : {
        type:String,
    },
    description : {
        type:String,
    },
    firm:[{
        type:mongoose.Schema.Types.ObjectId
    }]
})

const Product = mongoose.model('Product',productSchema)

module.exports = Product