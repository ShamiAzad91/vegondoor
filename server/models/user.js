const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    role:{
        type:String,
        default:'USER'
    },
    cart:[{
        type:mongoose.Types.ObjectId,
        ref:'Product'
    }]
},{
    timestamps:true
});

module.exports = mongoose.model('User',userSchema);