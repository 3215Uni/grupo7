const path = require('node:path');
const fs = require('fs');
const db = require('../database/models');

// Ruta al archivo de usuarios JSON (si fuera necesario)
const userFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));

async function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false;

    const emailInCookie = req.cookies.userEmail;
    
    // Busca el usuario en la base de datos usando el correo electrónico de la cookie
    if (emailInCookie) {
        try {
            const userCookie = await db.Usuario.findOne({
                where: {
                    email: emailInCookie
                }
            });

            if (userCookie) {
                res.locals.userLogged = userCookie;
                req.session.userLogged = userCookie; // Opcional: actualizar sesión con el usuario de la cookie
                res.locals.isLogged = true;
            }
        } catch (error) {
            console.error('Error buscando el usuario en la base de datos:', error);
        }
    }

    // Si hay un usuario en la sesión, usamos esa información
    if (req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }
    
    next();
}

module.exports = userLoggedMiddleware;
