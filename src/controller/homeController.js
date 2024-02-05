const path = require('node:path');





const controller = {
    renderHome: (req, res) =>{
        res.render('index', {
            title: 'TecnoJuy - Company',
        })
        
    }
}

module.exports = controller;