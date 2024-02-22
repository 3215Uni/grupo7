const express = require('express');
const router = express.Router();
const multer  = require('multer');
const path = require('node:path');


const productController=require('../controller/productController');



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // const pathFoulder=path.join(__dirname, '..','..','public', 'images');
        cb(null, 'public/img')
    },

    filename: (req, file, cb) =>{
        const newFileName = 'AR' + Date.now() + path.extname(file.originalname) ;
        
        cb(null, newFileName)
    }
});
const upload = multer({ storage });





router.get('/cart', productController.Cart);

router.get('/detail/:id',productController.Detail);

router.get('/registerProduct',productController.Register);
router.post('/registerProduct',upload.single('image'), productController.Create);

router.get('/edit/:id',productController.Edit);
router.put('/edit/:id',productController.Update);

router.get('/list', productController.List);


router.delete('/delete/:id', productController.delete);
module.exports=router;