const express = require('express');
const router = express.Router();

const path = require('node:path');
const {body}=require('express-validator');
const upload = require('../middlewares/multerUser.js');

const userController = require('../controller/userController.js');


const validation= [
    body('nombre').notEmpty().withMessage('Tienes que escribir un Nombre'),
    body('apellido').notEmpty().withMessage('Tienes que escribir un Apellido'),
    body('fechaNacimiento').notEmpty().withMessage('Tienes que ingresar tu Fecha de Nacimiento'),
    body('email').notEmpty().withMessage('Tienes que escribir un Email').bail()
    .isEmail().withMessage('Debes escribir un formato de correo valido'),
    body('celular').notEmpty().withMessage('Tienes que escribir un numero de Celular'),
    body('nomUsuario').notEmpty().withMessage('Tienes que escribir un nombre de Usuario'),
    body('contrasena').notEmpty().withMessage('Tienes que crear una Contraseña'),
    body('repitContrasena').notEmpty().withMessage('Tienes que repetir la Contraseña'),
    body('avatar').custom((value, {req})=>{
        let file=req.file;
        let aceptExtension=['.png','.jpg','.gif'];
        if(!file){
            throw new Error('Tienes que subir una imagen ') 
        }else{
            let fileExtension= path.extname(file.originalname);
            if(!aceptExtension.includes(fileExtension)){
                throw new Error(`Las extensiones de archivo permitidas son ${aceptExtension.join(', ')}` );
            };
        };
    })
];




router.get('/login', userController.renderLogin);
//Formulario de Registro
router.get('/register', userController.renderRegister);
//Procesa el registro
router.post('/register', upload.single('avatar'),validation ,userController.processRegister);

module.exports = router;