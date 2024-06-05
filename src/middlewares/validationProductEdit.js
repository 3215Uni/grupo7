
const { body } = require('express-validator');


const path = require('node:path');

const validationMiddleware = [
    
    body('name').notEmpty().withMessage('Tienes que escribir el nombre del Producto').isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres'),
    body('brand').notEmpty().withMessage('Tienes que seleccionar una Marca'),
    body('stock').notEmpty().withMessage('Tienes que escribir el stock').isInt({ min: 1 }).withMessage('El stock debe ser un número entero positivo'),
    body('category')
    .custom((value, { req }) => {
      if (!req.body.category) {
        throw new Error('Debe seleccionar al menos una categoría.');
      }
      return true;
    }),
    body('price').notEmpty().withMessage('Tienes que escribir un precio para el producto').isFloat({ min: 0.01 }).withMessage('Tienes que escribir el precio en un formato valido'),
    body('discount').isInt({ min: 1 }).withMessage('El descuento debe ser un número entero positivo'),
    body('description').notEmpty().withMessage('Tienes que escribir una descripcion del Producto').isLength({ min: 20 }).withMessage('La descripcion debe tener al menos 20 caracteres'),
    
];

module.exports = validationMiddleware;