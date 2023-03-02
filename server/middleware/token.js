const jwt = require("jsonwebtoken");
const SECRET_KEY = "iamgroot";
const mongoose = require("mongoose");
const User = require("../models/user");

const verifyToken = (req, res, next) => {
  let token = req.headers.authorization;
  if (token) {
    token = token.split(" ")[1];
    jwt.verify(token, SECRET_KEY, (err, payload) => {
      if (err) {
        return res.status(401).json({ error: "you must be logged in" });
      }
      const { _id } = payload;
      User.findById(_id).then((userdata) => {
        req.user = userdata;
        next();
      });
    });
  } else {
    return res.status(401).json({ error: "unauthorized User" });
  }
};

const isAdmin = async(req,res,next)=>{
    // console.log(req.user,"admin token");
    // console.log(req.user.role,"admin token");
    // let user = req.user;
    if(req.user.role === 'Admin'){
        next()
    }else{
        return res.status(403).json({ error: "you are not an admin" });

    }


}

module.exports = {verifyToken,isAdmin};


