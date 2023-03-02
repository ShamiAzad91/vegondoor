const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
    userId:{
        type:String
    },
    items:[{
        productId:{
            type:String
        },
        name:String,
        quantity:{
            type:Number,
            default:1,
        },
        price:Number,
    }],
    bill:{
        type:Number,
        default:0
    }
})

module.exports = mongoose.model('Cart',cartSchema)