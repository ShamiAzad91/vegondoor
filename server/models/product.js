const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String
    },
    desc:{
        type:String
    },
    category:{
        type:String
    },
    price:{
        type:Number
    },
    photo:{
        type:String,
        default:'NO PHOTO'
    }
})

module.exports = mongoose.model('Product',productSchema)