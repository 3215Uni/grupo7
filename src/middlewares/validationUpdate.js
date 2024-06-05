
const { body } = require('express-validator');


const path = require('node:path');

const validationMiddleware = [
    body('nombre').notEmpty().withMessage('Tienes que escribir un Nombre').isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
    body('apellido').notEmpty().withMessage('Tienes que escribir un Apellido').isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),
    body('fechaNacimiento').notEmpty().withMessage('Tienes que ingresar tu Fecha de Nacimiento'),
    body('email').notEmpty().withMessage('Tienes que escribir un Email').bail()
        .isEmail().withMessage('Debes escribir un formato de correo valido'),
    body('celular').notEmpty().withMessage('Tienes que escribir un numero de Celular').custom(value => {
        if (!/^\d+$/.test(value)) {
            throw new Error('El número de celular solo puede contener dígitos');
        }
        return true;
    }),
    body('nomUsuario').notEmpty().withMessage('Tienes que escribir un nombre de Usuario'),
    body('contrasena').notEmpty().withMessage('Tienes que crear una Contraseña'),
    body('repitContrasena').notEmpty().withMessage('Tienes que repetir la Contraseña').custom((value, { req }) => {
        if (value !== req.body.contrasena) {
            throw new Error('Las contraseñas no coinciden');
        }
        return true;
    }),
    body('avatar').custom((value, { req }) => {
        let file = req.file;
        let aceptExtension = ['.png', '.jpg', '.gif','.jpeg'];
        if (!file) {
            return true;
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!aceptExtension.includes(fileExtension)) {
                throw new Error(`Las extensiones de archivo permitidas son ${aceptExtension.join(', ')}`);
            };
            return true;
        };
    })
];

module.exports = validationMiddleware;