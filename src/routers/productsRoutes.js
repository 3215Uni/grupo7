const express = require('express');
const router = express.Router();


const productController=require('../controller/productController');


router.get('/cart', productController.Cart);

router.get('/detail/:id',productController.Detail);

router.get('/registerProduct',productController.Register);
router.post('/registerProduct', productController.Create);

router.get('/edit/:id',productController.Edit);
router.put('/edit/:id',productController.Update);

router.get('/list', productController.List);

router.get('/search', productController.Search)



module.exports=router;