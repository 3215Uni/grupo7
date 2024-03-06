const path = require('node:path');
const {validationResult}=require('express-validator');



const controller = {
    renderLogin: (req, res) =>{
        res.render('users/login', {
            title: 'Inicio Sesión - TecnoJuy',
        });
    },
    renderRegister: ( req, res ) =>{
        res.render('users/register', {
            title: 'Registro - TecnoJuy',
        })
    },
    processRegister: ( req, res ) =>{
        const resultValidation=validationResult(req);
        if(resultValidation.errors.length > 0){
            return res.render('users/register', {
                errors: resultValidation.mapped(),
                title: 'Registro - TecnoJuy',
                oldDate: req.body,
            });
        }
        res.render('users/register', {
            title: 'Registro - TecnoJuy'
        });
    }

}

module.exports = controller;