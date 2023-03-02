const User = require('../models/user');
const Product = require('../models/product');

// exports.addtocart = async(req,res)=>{
//     const userId = req.params.id;
//     const {productId,quantity} = req.body
//     try {
//         let cart = await Cart.findOne({userId});
//         let product = await Product.findOne({_id:productId});
//         if(!product){
//             res.status(404).send('Item not found!')
//         }

//         const price = product.price;
//         const name = product.name;

//         if(cart){
//             //if cart exists for the user
//             let productindex = cart.product.findIndex(p=>p.productId === productId);
//             // console.log(productindex,"hhh");
            
//             if(productindex > -1){
//                 let productItem = cart.product[productindex];
//                 productItem.quantity +=quantity;
//                 cart.product[itemIndex] = productItem;
//             }
//             else {
//                 cart.product.push({ productId, name, quantity, price });
//             }
//             cart.bill += quantity*price;
//             console.log('cart',cart)
//             cart = await cart.save();
//             return res.status(201).send(cart);
//         }else{
//                     // no cart exists, create one
//                     const newCart = await Cart.create({
//                         userId,
//                         items: [{ productId, name, quantity, price }],
//                         bill: quantity*price
//                     });
//                     return res.status(201).send(newCart);
//         }

//     } catch (err) {
//         return res.status(500).json({err:err.message,message:"Something went wrong",status:'failed'})
//     }

// }

// exports.addtocart = async (req,res) => {
//     const userId = req.params.id;
//     const { productId, quantity } = req.body;

//     try{
//         let cart = await Cart.findOne({userId});
//         let item = await Product.findOne({_id: productId});
//         if(!item){
//             res.status(404).send('Item not found!')
//         }
//         const price = item.price;
//         const name = item.title;

//         if(cart){
//             // if cart exists for the user
//             let itemIndex = cart.items.findIndex(p => p.productId == productId);

//             // Check if product exists or not
//             if(itemIndex > -1)
//             {
//                 let productItem = cart.items[itemIndex];
//                 productItem.quantity += quantity;
//                 cart.items[itemIndex] = productItem;
//             }
//             else {
//                 cart.items.push({ productId, name, quantity, price });
//             }
//             cart.bill += quantity*price;
//             cart = await cart.save();
//             return res.status(201).send(cart);
//         }
//         else{
//             // no cart exists, create one
//             const newCart = await Cart.create({
//                 userId,
//                 items: [{ productId, name, quantity, price }],
//                 bill: quantity*price
//             });
//             return res.status(201).send(newCart);
//         }       
//     }
//     catch (err) {
//         console.log(err);
//         res.status(500).send("Something went wrong");
//     }
// }

// module.exports.get_cart_items = async (req,res) => {
//     const userId = req.params.id;
//     try{
//         let cart = await Cart.findOne({userId});
//         if(cart && cart.items.length>0){
//             res.send(cart);
//         }
//         else{
//             res.send(null);
//         }
//     }
//     catch(err){
//         console.log(err);
//         res.status(500).send("Something went wrong");
//     }
// }
exports.addToCart = async(req,res)=>{
    try {
// console.log(req.body,"hiii");
        let result = await User.updateOne({_id:req.params.id},{
            $addToSet:{cart:req.body.productId}
        });

        if(!result)
        return res.status(400).json({error:"Unable to add item to cart ",status:"failed"});

        return res.status(200).json({result:result,message:"successfully  added item to cart ",status:"success"});
        
    } catch (err) {
        return res.status(500).json({err:err.message,error:"Somethings went wrong",status:"failed"})
        
    }
}

exports.getUserCart = async(req,res)=>{
    try {
// console.log(req.body,"hiii");
        let result = await User.findOne({_id:req.params.id }).populate('cart');

        if(!result)
        return res.status(400).json({error:"Unable to get item to cart ",status:"failed"});

        return res.status(200).json({result:result,message:"successfully  get item to cart ",status:"success"});
        
    } catch (err) {
        return res.status(500).json({err:err.message,error:"Somethings went wrong",status:"failed"})
        
    }
}