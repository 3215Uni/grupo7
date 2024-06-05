
const db=require('../database/models')
const fs=require('fs');
const {validationResult}=require('express-validator');



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
        const resultValidation=validationResult(req);
        if(resultValidation.errors.length > 0){
            const marcas=await db.Marca.findAll();
            return res.render('products/registerProduct', {
                errors: resultValidation.mapped(),
                title: 'Añadir Producto - TecnoJuy',
                oldDate: req.body,
                marcas:marcas
            });
        }else{
            try{
                const newProd={
                    name: req.body.name,
                    id_marca: req.body.brand,
                    stock: req.body.stock,
                    description: req.body.description,
                    category: req.body.category,
                    price: req.body.price,
                    discount: req.body.discount,
                    favorito: false,
                    image: req.file?.filename || "default-image.png",
                    id_user: res.locals.userLogged.id
                }
                console.log(res.locals.userLogged.id)
                
                await db.Producto.create(newProd);
            
                res.redirect('/product/list');
            }catch{
                console.log("error");
            }
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
        const resultValidation=validationResult(req);
        if(resultValidation.errors.length > 0){
            const id=req.params.id;
            const marcas=await db.Marca.findAll();
            const producto= await db.Producto.findByPk(id);
            console.log(resultValidation)
            return res.render('products/editProduct', {
                errors: resultValidation.mapped(),
                producto: producto,
                title: 'Editar Producto - TecnoJuy',
                oldDate: req.body,
                marcas:marcas
            });
        }else{
            const updateProd={
                name: req.body.name,
                id_marca: req.body.brand,
                stock: req.body.stock,
                description: req.body.description,
                category: req.body.category,
                price: req.body.price,
                discount: req.body.discount,
                favorito: false,
            }
            
            if (req.file) {
                updateProd.image = req.file.filename;
            }
            
            await db.Producto.update(
                updateProd
            , {
                where: {
                    id: req.params.id
                }
            });
    
            res.redirect(`/product/detail/${req.params.id}`);
            
        }
        
        
    },

    List:async( req, res ) =>{
        const list=await db.Producto.findAll();
        res.render('products/productList', {
            title: 'Lista de Productos - TecnoJuy',
            products: list
        });
    },

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