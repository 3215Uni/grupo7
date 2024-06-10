const path = require('node:path');
const fs=require('fs');
const bcrypt = require('bcryptjs');
const db=require('../database/models')
const {validationResult}=require('express-validator');
const { where } = require('sequelize');
const { Session } = require('node:inspector');
const { Update } = require('./productController');
const userFilePath=path.join(__dirname,'../data/users.json');
const users=JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));





const controller = {
    login: (req, res) =>{
        res.render('users/login', {
            title: 'Inicio Sesión - TecnoJuy',
        });
    },
    loginProcess: async( req, res ) =>{
        const userToLogin=await db.Usuario.findOne({
            where:{
                email:req.body.email
            }
        })
        //users.find((user)=>user.email==req.body.email);
        console.log(userToLogin);
        if(userToLogin){           
            let isOkPassword=bcrypt.compareSync(req.body.password, userToLogin.password);
            if(isOkPassword){
                //delete userToLogin.password;
                req.session.userLogged=userToLogin;
                if(req.body.remember){
                    res.cookie('userEmail', req.body.email, {maxAge: (1000*60)*2 })
                }
                return res.redirect('/')
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
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    },
    register: ( req, res ) =>{
        res.render('users/register', {
            title: 'Registro - TecnoJuy',
        })
    },
    processRegister: async( req, res ) =>{
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
                const contrasenaEncriptada = bcrypt.hashSync(req.body.contrasena, 10);
                const userInBD=await db.Usuario.findOne({
                    where:{
                        email: req.body.email
                    }
                });
                //users.find((user)=>user.email==req.body.email);
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
                }else{
                    const newUser = {
                        name: req.body.nombre,
                        last_name: req.body.apellido,
                        birthday: req.body.fechaNacimiento,
                        email: req.body.email,
                        phone: req.body.celular,
                        user_name: req.body.nomUsuario,
                        password: contrasenaEncriptada, // Guarda la contraseña encriptada
                        image: req.file?.filename || "usuario-defecto.png"
                    };
    
    
                    await db.Usuario.create(newUser);              
                    res.redirect('/');
                }
                
            } catch (error) {
                console.error('Error al procesar el registro:', error);
                res.status(500).send('Error interno del servidor');
            }
        }
        
    },
    profile: async(req, res) =>{
        const user=await db.Usuario.findOne({
            where:{
                email:req.session.userLogged.email
            }
        })
        res.render('users/profile',{
            title: 'Profile - TecnoJuy',
            user: user,
        });
    },
    update: async(req,res)=>{

        res.render('users/editUser', {
            title: 'Editar Usuario - TecnoJuy',
        })
    },
    updateUser: async (req, res)=>{
        const resultValidation=validationResult(req);
        if(resultValidation.errors.length > 0){
            return res.render('users/editUser', {
                errors: resultValidation.mapped(),
                title: 'Editar Usuario - TecnoJuy',
                oldDate: req.body,
            });
        }else{
            try {
                // Encripta la contraseña antes de guardarla
                const contrasenaEncriptada = bcrypt.hashSync(req.body.contrasena, 10);
                
                //users.find((user)=>user.email==req.body.email);
               
                
                    const editUser = {
                        name: req.body.nombre,
                        last_name: req.body.apellido,
                        birthday: req.body.fechaNacimiento,
                        email: req.body.email,
                        phone: req.body.celular,
                        user_name: req.body.nomUsuario,
                        password: contrasenaEncriptada, // Guarda la contraseña encriptada
                        image: req.file?.filename || "usuario-defecto.png"
                    };
                    
                    if (!req.file) {
                        editUser.image = req.session.userLogged.image;
                    }
            
    
                    await db.Usuario.update(editUser,{
                        where: {
                            email: req.session.userLogged.email
                        }
                    });
                    const userInBD=await db.Usuario.findOne({
                        where:{
                            user_name: req.params.userName
                        }
                    });
                    req.session.userLogged=userInBD;
                    console.log( req.session.userLogged);          

                    res.redirect(`/users/profile/${req.params.userName}`);
                
                
            } catch (error) {
                console.error('Error al procesar el registro:', error);
                res.status(500).send('Error interno del servidor');
            }
        }
        
    }

}

module.exports = controller;