const express = require('express');
const router = express.Router();


const upload=require('../middlewares/multerProduct.js')
const productController=require('../controller/productController');








router.get('/cart', productController.Cart);

router.get('/detail/:id',productController.Detail);

router.get('/registerProduct',productController.Register);
router.post('/registerProduct',upload.single('image'), productController.Create);

router.get('/edit/:id',productController.Edit);
router.put('/edit/:id',productController.Update);

router.get('/list', productController.List);


router.delete('/delete/:id', productController.delete);
module.exports=router;