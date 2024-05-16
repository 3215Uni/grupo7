
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

    Register: ( req, res ) =>{
        res.render('products/registerProduct', {
            title: 'Añadir Producto - TecnoJuy'
        });
    },

    Create: ( req, res ) =>{
        const newProd={
            id: products.length+1,
            name: req.body.name,
            brand: req.body.brand,
            stock: req.body.stock,
            description: req.body.description,
            
            category: req.body.category,
            price: "$"+req.body.price,
            colors: [],
            discount: req.body.discount+'%',
            favorito: false
        }


        newProd.image= req.file?.filename || "default-image.png"
        products.push(newProd);
        //Sobrescribe el archivo
        fs.writeFileSync(productFilePath, JSON.stringify(products,null,2));
        res.redirect('/product/list');
    },

    Edit: ( req, res ) =>{
        const id=req.params.id;
        const producto=products.find((prod)=>prod.id==id);
        res.render('products/editProduct', {
            title: 'Editar Producto - TecnoJuy',
            producto: producto

        });
    },
    Update: ( req, res ) =>{
        const id=req.params.id;
        const {name, image, brand, stock, category, price, discount, description}=req.body;
        products.forEach(e => {
            if(e.id==id){
                e.name=name;
                e.image=image;
                e.brand=brand;
                e.stock=stock,
                e.description=description;
                e.category=category;
                e.price=price;
                e.discount=discount;
            }
        });

        fs.writeFileSync(path.join(__dirname, '../data/products.json'), JSON.stringify(products, null, 2),{encoding:'utf-8'})
        res.redirect('/product/list')
    },

    List:( req, res ) =>{
        res.render('products/productList', {
            title: 'Lista de Productos - TecnoJuy',
            products: products
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
    delete: (req, res) => {
        let idProduct = req.params.id;
        console.log("ID del producto a eliminar:", idProduct);
        
        // Buscar el índice del producto a eliminar
        let indexDelete = products.findIndex(product => product.id === parseInt(idProduct));
        console.log("Índice del producto a eliminar:", indexDelete);
    
        // Verificar si se encontró el producto
        if (indexDelete === -1) {
            console.log("El producto con el ID proporcionado no existe en la lista.");
            // Redireccionar a la lista de productos con un mensaje de error
            return res.redirect('/product/list');
        }
    
        // Eliminar el producto de la lista
        products.splice(indexDelete, 1);
    
        // Sobrescribir el archivo con la lista actualizada de productos
        fs.writeFileSync(productFilePath, JSON.stringify(products, null, 2));
    
        // Redireccionar a la lista de productos después de eliminar un producto
        return res.redirect('/product/list');
    }
    
    }



module.exports = controller;