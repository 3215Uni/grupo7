const express = require('express');
const router = express.Router();


const productController=require('../controller/productController');


router.get('/cart', productController.renderCart);
router.get('/detail',productController.renderDetail);
router.get('/registerProduct',productController.renderRegister);



module.exports=router;