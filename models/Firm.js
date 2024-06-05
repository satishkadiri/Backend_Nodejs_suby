const mongoose = require('mongoose')

const schema = mongoose.Schema

const firmSchema = new schema({
    firmName:{
        type:String,
        required:true,
        unique:true,
    },
    area:{
        type:String,
        required:true
    },
    category:{
        type:[
            {
                type:String,
                enum:['veg','non-veg']
            }
        ]
    },
    region:{
        type:[{
            type:String,
            enum:['south-indian','north-indian','chinese','bakery']
        }]
    },
    offer:{
        type:String
    },
    vendor:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'vendor'
    }],
    product:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product '
    }]
})
const firm = mongoose.model('firm',firmSchema)
module.exports = firm