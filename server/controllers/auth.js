const User = require('../models/user');
var bcrypt = require('bcryptjs');
const SECRET_KEY = "iamgroot";

var jwt = require('jsonwebtoken');

exports.signup = async(req,res)=>{
    try {
        const {name,email,password} = req.body;
        if(!name || !email || !password)
        return res.status(422).json({mess:'Plz include all the fields',status:"failed"})
        
        const userExist = await User.findOne({email});
        if(userExist)
        return res.status(400).json({error:'User Already registerd',status:'failed'});
        
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(req.body.password,salt)

        const user = new User({
            name,
            email,
            password:hashedPassword
        });

        const result = await user.save();

        if(!result)
        return res.status(400).json({error:'unable to save the user',status:'failed'});
        return res.status(200).json({user:result,message:'successfully user saved',status:'success'});


        
    } catch (err) {
        return res.status(500).json({err:err.message,msg:'Something went wrong',status:'success'});
        
    }
}

exports.signin = async(req,res)=>{
    try {
        const {email,password} = req.body;

        if(!email || !password)
        return res.status(422).json({mess:'Plz include all the fields',status:"failed"})

        const userExist = await User.findOne({email});
        if(!userExist)
        return res.status(400).json({error:'Unable to get the user',status:'failed'});

        const comparePassword = await bcrypt.compare(req.body.password,userExist.password,);
        // console.log("hii",comparePassword);
        // console.log('user',userExist)
        if(!comparePassword)
        return res.status(400).json({error:'in valid credentials',status:'failed'});
            
        userExist.password = undefined;
        const token = jwt.sign({_id:userExist._id},SECRET_KEY,{expiresIn:'2h'})


        return res.status(200).json({user:userExist,auth:token,message:'successfully user signin',status:'success'});
        


        
    } catch (err) {
        
    }
}