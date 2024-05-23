
const db=require('../database/models')
const fs=require('fs');
const path = require('node:path');
const productFilePath=path.join(__dirname,'../data/products.json');
const products=JSON.parse(fs.readFileSync(productFilePath, 'utf-8'));



const controller = {

    Cart: (req, res) =>{

        db.Producto.findAll()
            .then(function(producto){
                return res.render('products/productCart', {
                    title: 'Carrito de Compras - TecnoJuy',
                    producto:producto
                });
            })
    },

    Detail: async( req, res ) =>{

        const idRequerida=req.params.id;
        //productDetail constante que almacena la busqueda por id
        const productDetail = await db.Producto.findByPk(idRequerida);

        res.render('products/productDetail', {
            title: 'Detalle de Producto - TecnoJuy',
            productDetail:productDetail
        });
    },

    Register: async ( req, res ) =>{
        const marcas=await db.Marca.findAll();
        res.render('products/registerProduct', {
            title: 'Añadir Producto - TecnoJuy',
            marcas:marcas
        });
    },

    Create: async ( req, res ) =>{
        try{
            const newProd={
                name: req.body.name,
                id_marca: req.body.brand,
                stock: req.body.stock,
                description: req.body.description,
                category: req.body.category,
                price: req.body.price,
                discount: req.body.discount,
                favorito: false
            }
            newProd.image= req.file?.filename || "default-image.png"
            await db.Producto.create(newProd);
            res.redirect('/product/list');
        }catch{
            console.log("error");
        }
        
    },

    Edit: async( req, res ) =>{
        const id=req.params.id;
        const marcas=await db.Marca.findAll();
        const producto= await db.Producto.findByPk(id);
        res.render('products/editProduct', {
            title: 'Editar Producto - TecnoJuy',
            producto: producto,
            marcas:marcas

        });
    },
    Update: async ( req, res ) =>{
        
        const updateProd={
            name: req.body.name,
            id_marca: req.body.brand,
            stock: req.body.stock,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
            discount: req.body.discount,
            favorito: false,
            image:req.file?.filename || "default-image.png"
        }
        
        console.log(updateProd);
        
        await db.Producto.update(
            updateProd
        , {
            where: {
                id: req.params.id
            }
        });

        await res.redirect(`/product/detail/${req.params.id}`);
        
        
    },

    List:async( req, res ) =>{
        const list=await db.Producto.findAll();
        res.render('products/productList', {
            title: 'Lista de Productos - TecnoJuy',
            products: list
        });
    },

    
    /**********************/
    //Delete: borra 1 producto de la base de datos

    /*********************/
    /*
    delete: (req, res) => {
        let idProduct = req.params.id;
        // Filtrar la lista de productos para excluir el producto que se desea eliminar
        let indexDelete = products.findIndex(product => product.id === idProduct);
        products.splice(indexDelete, 1);
        // Sobrescribe el archivo con la lista actualizada de productos
        fs.writeFileSync(productFilePath, JSON.stringify(products, null, 2));
        // Redirecciona a la lista de productos después de eliminar un producto
        return res.redirect('/product/list');
    }
    */
    delete:async (req, res) => {
        await db.Producto.destroy({
            where:{
                id: req.params.id
            }
        })
        return res.redirect('/product/list');
    }
    
    }



module.exports = controller;