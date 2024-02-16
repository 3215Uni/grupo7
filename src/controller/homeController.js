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
        
    }
}

module.exports = controller;