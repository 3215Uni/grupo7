const path = require('node:path');
const fs = require('fs');
const userFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));
const db = require('../database/models');

async function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false;
    const emailInCookie = req.cookies.userEmail;

    console.log('Email in cookie:', emailInCookie); // Logging para depuración

    if (emailInCookie) {
        try {
            const userCokie = await db.Usuario.findOne({
                where: {
                    email: emailInCookie
                }
            });

            // let userCokie = users.find((user) => user.email == emailInCookie);
            if (userCokie) {
                res.locals.userLogged = userCokie;
            }
        } catch (error) {
            console.error('Error al buscar el usuario por email en cookie:', error);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
    } else {
        console.log('No email found in cookie');
    }

    if (req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }

    next();
}

module.exports = userLoggedMiddleware;