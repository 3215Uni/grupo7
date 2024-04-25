module.exports = function(sequelize, dataTypes){
    let alias="Carrito";
    let cols={
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_factura: {
            type: dataTypes.INTEGER
        },
        id_producto:{
            type: dataTypes.INTEGER
        },
        precio_unidad: {
            type: dataTypes.FLOAT(10,2)
        },
        cantidad: {
            type: dataTypes.INTEGER
        }
        
    }  
    let config={
        tableName: "productos_de_factura",
        timestaps: false
    }
    
    let Carrito=sequelize.define(alias, cols, config);


    Carrito.associate=function(models){
        Carrito.belongsTo(models.Producto,{
            as:"producto",
            foreignKey: "id_producto"
        })
        Carrito.belongsTo(models.Factura,{
            as:"factura ",
            foreignKey: "id_factura"
        })
    }
    
    return Carrito;
};