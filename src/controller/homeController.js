const fs=require('fs');
const path = require('node:path');
const db=require('../database/models');
const { Op, where } = require('sequelize');
const bcrypt = require('bcryptjs');
const productFilePath=path.join(__dirname,'../data/products.json');
const products=JSON.parse(fs.readFileSync(productFilePath, 'utf-8'));


const controller = {
   
    renderHome: async (req, res) =>{
        const visitedProducts = await db.Producto.findAll({
            where:{
                category:{
                    [Op.like]: `%${"visited"}%`
                }
            }
        });
        
        
        const inSale = await db.Producto.findAll({
            where:{
                category:{
                    [Op.like]: `%${"in-sale"}%`
                }
            }
        });
        res.render('index', {
            title: 'TecnoJuy - Company',
            visitedProducts: visitedProducts,
            inSale: inSale
        })
        
    },

    Search: (req, res) =>{
        const busqueda = req.query.keywords;
        db.Producto.findAll({
            where: {
                name: {
                    [Op.like]: `%${busqueda}%`
                }
            }
            
        }).then(productSearch=>{
            db.Marca.findAll()
            .then(marca=>{
                res.render('productSearch',{
                    title: 'Busqueda - TecnoJuy',
                    productSearch: productSearch,
                    busqueda: busqueda,
                    marca:marca
                });
            })
            
        }).catch(error => {
            console.error('Error al buscar productos:', error);
            
        });
        
        
        
    }

};

module.exports = controller;