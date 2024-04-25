module.exports = function(sequelize, dataTypes){
    let alias="Producto";
    let cols={
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: dataTypes.STRING
        },
        id_marca: {
            type: dataTypes.INTEGER
        },
        stock: {
            type: dataTypes.INTEGER
        },
        description:{
            type: dataTypes.STRING
        },
        category:{
            type: dataTypes.STRING
        },
        price: {
            type: dataTypes.FLOAT(10,2)
        },
        discount: {
            type: dataTypes.INTEGER
        },
        favorite:{
            type: dataTypes.BOOLEAN
        },
        image:{
            type: dataTypes.STRING
        },
        id_user: {
            type: dataTypes.INTEGER
        }
    }  
    let config={
        tableName: "productos",
        timestaps: false
    }
    
    let Producto=sequelize.define(alias, cols, config);
    Producto.associate=function(models){
        Producto.hasMany(models.Carrito,{
            as:"carritos",
            foreignKey: "id_producto"
        })
        Producto.belongsTo(models.Usuario,{
            as:"usuario",
            foreignKey: "id_user"
        })
        Producto.belongsTo(models.Marca,{
            as:"marca",
            foreignKey: "id_marca"
        })
    }
    
    return Producto;
};