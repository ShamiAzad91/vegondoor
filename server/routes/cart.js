const router = require('express').Router();
const {addToCart,getUserCart} = require('../controllers/cart');
const {verifyToken,isAdmin} = require('../middleware/token');


router.post("/cart/:id",verifyToken,addToCart);
router.get('/cart/:id',verifyToken,getUserCart);


module.exports = router;