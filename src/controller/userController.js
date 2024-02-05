const path = require('node:path');



const controller = {
    renderLogin: (req, res) =>{
        res.render('users/login.ejs');
        
    }
}

module.exports = controller;