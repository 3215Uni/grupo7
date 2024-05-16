/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize/types'.DataTypes)} dataTypes 
 * 
 */





module.exports = function(sequelize, dataTypes){
    let alias="Prod_Carrito";
    let cols={
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_carrito: {
            type: dataTypes.INTEGER
        },
        id_producto:{
            type: dataTypes.INTEGER
        },
        cantidad: {
            type: dataTypes.INTEGER
        }
        
    }  
    let config={
        tableName: "productos_de_carrito",
        timestamps: false
    }
    
    let Prod_Carrito=sequelize.define(alias, cols, config);


    Prod_Carrito.associate=function(models){
        Prod_Carrito.belongsTo(models.Producto,{
            as:"producto",
            foreignKey: "id_producto"
        })
        Prod_Carrito.belongsTo(models.Carrito,{
            as:"productos_de_carrito",
            foreignKey: "id_factura"
        })
    }
    
    return Prod_Carrito;
};