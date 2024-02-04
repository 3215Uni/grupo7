const path = require('node:path');





const controller = {
    renderHome: (req, res) =>{
        res.render('index', {
            title: 'Productos recomendados',
        })
        
    }
}

module.exports = controller;