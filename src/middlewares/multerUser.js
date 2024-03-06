const multer  = require('multer');
const path = require('node:path');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // const pathFoulder=path.join(__dirname, '..','..','public', 'images');
        cb(null, 'public/img/users')
    },

    filename: (req, file, cb) =>{
        const newFileName = 'avatar-' + Date.now() + path.extname(file.originalname) ;
        
        cb(null, newFileName)
    }
});
const upload = multer({ storage });

module.exports=upload;
