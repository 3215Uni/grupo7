const path = require('node:path');



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
        return res.send(req.body);
    }

}

module.exports = controller;