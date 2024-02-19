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

        const id=req.params.id;
        const productDetail=products.find((prod)=>prod.id==id);

        res.render('products/productDetail', {
            title: 'Detalle de Producto - TecnoJuy',
            productDetail:productDetail
        });
    },

    renderRegister: ( req, res ) =>{
        res.render('products/registerProduct', {
            title: 'Añadir Producto - TecnoJuy'
        });
    },

    renderCreate: ( req, res ) =>{
        const newProd={
            id: products.length+1,
            name: req.body.name,
            description: req.body.description,
            image: req.body.image,
            category: req.body.category,
            price: req.body.price,
            colors: [],
            discount: req.body.discount+'%',
            favorito: false
        }
        products.push(newProd);
        //Sobrescribe el archivo
        fs.writeFileSync(productFilePath, JSON.stringify(products,null,2));
        res.redirect('/product/list');
    },

    
    //codigo para eliminar
    /*detroy: (req, res) => {
        const {id} = req.params;
        // Filtrar la lista de productos para excluir el producto que se desea eliminar
        const indexProduct = products.findIndex(product => product.id ==id);
        products.splice(indexProduct,1);
        // Sobrescribe el archivo con la lista actualizada de productos
        fs.writeFileSync(productFilePath, JSON.stringify(products, null, 2));
        // Redirecciona a la lista de productos después de eliminar
        res.redirect('/');
    },
*/

    renderEdit: ( req, res ) =>{
        res.render('products/editProduct', {
            title: 'Editar Producto - TecnoJuy',
        });
    },

    renderList:( req, res ) =>{
        res.render('products/productList', {
            title: 'Lista de Productos - TecnoJuy',
            products: products
        });
    },

    renderSearch:(req, res) =>{

        res.render('products/productSearch',{
            title: 'Busqueda - TecnoJuy'
        });
    }

}   


module.exports = controller;