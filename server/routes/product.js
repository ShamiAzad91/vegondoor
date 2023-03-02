const router = require('express').Router();
const {addProduct,getAllProduct,getSingleProduct} = require('../controllers/product');
const {verifyToken,isAdmin} = require('../middleware/token');

router.post("/add",verifyToken,addProduct);
router.get("/all",verifyToken,getAllProduct);
router.get("/single/:id",verifyToken,getSingleProduct);





module.exports = router;