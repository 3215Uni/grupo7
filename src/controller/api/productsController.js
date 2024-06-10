const db = require('../../database/models');

const productos = {
    
    async getProducts(req,res){
        try {
            const products = await db.Producto.findAll();
            const marcas = await db.Marca.findAll();

            const productList = products.map(prod => ({
                id: prod.id,
                name: prod.name,
                description: prod.description,
                category: prod.category,
                image: prod.image,
                marca: marcas.find(marca => marca.id == prod.id_marca).name,
                detail:`/api/products/${prod.id}`
            }));
            res.json({
                status:200,
                count:products.lenght,
                count_by_marcas:marcas.lenght,
                products: productList
            });
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