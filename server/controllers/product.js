const Product = require('../models/product');

exports.addProduct = async(req,res)=>{
 try {
   // let user = req.user;
   // console.log('user',user)
    const product = new Product(req.body);
    const result = await product.save();
    if(!result)
    return res.status(400).json({error:'unable to add the product',status:'failed'});
    return res.status(200).json({product:result,message:'successfully added the product',status:'success'});
    
 } catch (err) {
    return res.status(500).json({err:err.message,msg:'Something went wrong',status:'success'});
    
 }

}
exports.getAllProduct = async(req,res)=>{
   try{
      let product = await Product.find();
      if(product.length<0)
    return res.status(400).json({message:"there is no product to display",status:"failed"});
    return res.status(200).send(product);

   }catch(err){
      return res.status(500).json({err:err.message,message:"Something went wrong",status:"failed"})
   }
}
exports.getSingleProduct = async(req,res)=>{
   try{
      let product = await Product.find({_id:req.params.id});
      if(product.length<0)
    return res.status(400).json({message:"there is no product to display",status:"failed"});
    return res.status(200).send(product);

   }catch(err){
      return res.status(500).json({err:err.message,message:"Something went wrong",status:"failed"})
   }
}