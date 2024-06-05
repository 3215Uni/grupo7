const express = require('express');
const router = express.Router();
const upload=require('../middlewares/multerProduct.js')
const productController=require('../controller/productController');
const validation=require('../middlewares/validationProduct.js');
const validation2=require('../middlewares/validationProductEdit.js');








router.get('/cart', productController.Cart);

router.get('/detail/:id',productController.Detail);

router.get('/registerProduct',productController.Register);
router.post('/registerProduct',upload.single('image'),validation,productController.Create);

router.get('/edit/:id',productController.Edit);
router.put('/edit/:id',upload.single('image'),validation2,productController.Update);

router.get('/list', productController.List);


router.delete('/delete/:id', productController.delete);
module.exports=router;