"use strict"

const express = require('express')
const app = express()
const dotEnv = require('dotenv');
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5001;
const bodyParser = require('body-parser')
const vendorRoutes = require('./routes/vendorRoutes')
const firmRoutes = require('./routes/firmRoutes')
const productRoutes = require('./routes/productRoutes')
const path = require('path')
dotEnv.config();


mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, })
.then(()=>{console.log("mongodb connected successfully")})
.catch((error) => {console.log("mongodb error",error)})

app.use(bodyParser.json())

app.use('/vendor',vendorRoutes)
app.use('/firm',firmRoutes)
app.use('/product',productRoutes)
app.use('/uploads',express.static('uploads'))
app.listen(PORT,()=>{
    console.log(`server started ${PORT}`)
})

app.use('/home',(req,res) =>{
    res.send("welcome to satyadev website")
})