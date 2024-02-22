const fs=require('fs');
const path = require('node:path');

const productFilePath=path.join(__dirname,'../data/products.json');
const products=JSON.parse(fs.readFileSync(productFilePath, 'utf-8'));


const controller = {
   
    renderHome: (req, res) =>{
        const visitedProducts = products.filter((products)=> products.category ==="visited");
        const inSale = products.filter((products)=> products.category ==="in-sale");

        res.render('index', {
            title: 'TecnoJuy - Company',
            visitedProducts: visitedProducts,
            inSale: inSale
        })
        
    },

    Search:(req, res) =>{
        const busqueda = req.query.keywords;
        // console.log(busqueda)
        const productSearch=products.filter((prod)=>prod.name.toLowerCase().includes(busqueda.toLowerCase()));
        // console.log(productSearch)
        res.render('productSearch',{
            title: 'Busqueda - TecnoJuy',
            productSearch: productSearch,
            busqueda: busqueda
        });
    }

}

module.exports = controller;