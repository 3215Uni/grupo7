const path = require('node:path');
const fs=require('fs');
const bcrypt = require('bcryptjs');
const {validationResult}=require('express-validator');
const userFilePath=path.join(__dirname,'../data/users.json');
const users=JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));





const controller = {
    login: (req, res) =>{
        res.render('users/login', {
            title: 'Inicio Sesión - TecnoJuy',
        });
    },
    loginProcess: ( req, res ) =>{
        const userToLogin=users.find((user)=>user.email==req.body.email);
        if(userToLogin){           
            let isOkPassword=bcrypt.compareSync(req.body.password, userToLogin.password);
            if(isOkPassword){
                delete userToLogin.password;
                req.session.userLogged=userToLogin;
                console.log(req.session.userLogged);
                res.redirect('/')
            }else{
                return res.render('users/login', {
                    errors:{
                        email:{
                            msg:'Las credenciales son invalidas'
                        }
                    },
                    title: 'Inicio Sesión - TecnoJuy',
                });
            }
            
        }else{
            return res.render('users/login', {
                errors:{
                    email:{
                        msg:'No se encuentra al usuario en la Base de Datos'
                    }
                },
                title: 'Inicio Sesión - TecnoJuy',
            });
        }
        
    
    },
    logout:(req, res)=>{
        req.session.destroy();
        return res.redirect('/');
    },
    register: ( req, res ) =>{
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
                const userInBD=users.find((user)=>user.email==req.body.email);
                console.log(userInBD);
                if(userInBD){
                    return res.render('users/register', {
                        errors:{
                            email:{
                                msg:'Este email ya esta registrado'
                            }
                        },
                        title: 'Registro - TecnoJuy',
                        oldDate: req.body,
                    })
                }
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