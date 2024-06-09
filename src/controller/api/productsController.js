const db = require('../../database/models');

const productos = {
    
    async getProducts(req,res){
        try {
            const products = await db.Producto.findAll();
            const response = {
                meta:{
                    status: 200,
                    total: products.length,
                    detail: 'api/products'
                },
                data: products
            }
            res.send(response);
        } catch (error) {
            res.send(error);
        }
    },
    async getProduct(req,res){
        try {
            const product = await db.Producto.findByPk(req.params.id);
            if(!product){
                return res.status(404).send({message: 'Product not found'});
            }
            res.send(product);
        } catch (error) {
            res.send(error);
        }
    }

}

module.exports = productos;