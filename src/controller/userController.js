const path = require('node:path');
const fs=require('fs');
const bcrypt = require('bcryptjs');
const {validationResult}=require('express-validator');
const userFilePath=path.join(__dirname,'../data/users.json');
const users=JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));





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
    processRegister: async ( req, res ) =>{
        const resultValidation=validationResult(req);
        if(resultValidation.errors.length > 0){
            return res.render('users/register', {
                errors: resultValidation.mapped(),
                title: 'Registro - TecnoJuy',
                oldDate: req.body,
            });
        }else{
            try {
                // Encripta la contraseña antes de guardarla
                const contrasenaEncriptada = await bcrypt.hash(req.body.contrasena, 10);

                const newUser = {
                    id: crypto.randomUUID(),
                    name: req.body.nombre,
                    lastName: req.body.apellido,
                    date: req.body.fechaNacimiento,
                    email: req.body.email,
                    phone: req.body.celular,
                    userName: req.body.nomUsuario,
                    password: contrasenaEncriptada, // Guarda la contraseña encriptada
                };

                newUser.image = req.file?.filename || "default-image.png";
                users.push(newUser);
                fs.writeFileSync(userFilePath, JSON.stringify(users, null, 2));
                res.redirect('/');
            } catch (error) {
                console.error('Error al procesar el registro:', error);
                res.status(500).send('Error interno del servidor');
            }
        }
        
    }

}

module.exports = controller;