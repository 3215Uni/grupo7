const path = require('node:path');
const cryto=require('crypto');
const fs=require('fs');

const productFilePath=path.join(__dirname,'../data/products.json');
const products=JSON.parse(fs.readFileSync(productFilePath, 'utf-8'));



const controller = {

    renderCart: (req, res) =>{
        res.render('products/productCart', {
            title: 'Carrito de Compras - TecnoJuy',
        });
    },

    renderDetail: ( req, res ) =>{
        res.render('products/productDetail', {
            title: 'Detalle de Producto - TecnoJuy',
        });
    },

    renderRegister: ( req, res ) =>{
        res.render('products/registerProduct', {
            title: 'Añadir Producto - TecnoJuy'
        });
    },

    renderCreate: ( req, res ) =>{
        const newProd={
            id: cryto.randomUUID(),
            name: req.body.name,
            description: req.body.description,
            image: req.body.image,
            category: req.body.category,
            price: req.body.price,
            colors: [],
            descuento: req.body.discount+'%',
            favorito: false
        }
        products.push(newProd);
        //Sobrescribe el archivo
        fs.writeFileSync(productFilePath, JSON.stringify(products,null,2));
        res.redirect('/product/list');
    },

    renderEdit: ( req, res ) =>{
        res.render('products/editProduct', {
            title: 'Editar Producto - TecnoJuy',
        });
    },

    renderList:( req, res ) =>{
        res.render('products/productList', {
            title: 'Lista de Productos - TecnoJuy',
        });
    },

    renderSearch:(req, res) =>{
        res.render('products/productSearch',{
            title: 'Busqueda - TecnoJuy'
        });
    }

}   


module.exports = controller;