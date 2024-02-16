const path = require('node:path');



const controller = {
    renderCart: (req, res) =>{
        res.render('products/productCart', {
            title: 'Carrito de Compras - TecnoJuy',
        });
    },
    renderDetail: ( req, res ) =>{
        res.render('products/productDetail', {
            title: 'Detalle de Producto - TecnoJuy',
        })
    },
    renderRegister: ( req, res ) =>{
        res.render('products/registerProduct', {
            title: 'Añadir Producto - TecnoJuy'
        })
    },
    renderEdit: ( req, res ) =>{
        res.render('products/editProduct', {
            title: 'Editar Producto - TecnoJuy',
        })
    },
    renderList:( req, res ) =>{
        res.render('products/productList', {
            title: 'Lista de Productos - TecnoJuy',
        })
    },
    renderSearch:(req, res) =>{
        res.render('products/productSearch',{
            title: 'Busqueda - TecnoJuy'
        })
    }

}


module.exports = controller;