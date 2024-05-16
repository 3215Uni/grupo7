/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize/types'.DataTypes)} dataTypes 
 * 
 */





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
        timestamps: false, 
        tableName: 'productos'
    }
    
    let Producto=sequelize.define(alias, cols, config);
    Producto.associate=function(models){
        Producto.belongsToMany(models.Carrito, { 
            through: 'producto_de_carrito', // Nombre de la tabla intermedia
            foreignKey: 'id_producto', 
            otherKey: 'id_carrito', 
            as: 'carritos' // Alias para la relación
        });
        Producto.belongsTo(models.Marca,{
            as:"marca",
            foreignKey: "id_marca"
        });
        Producto.belongsTo(models.Usuario,{
            as: "usuario",
            foreignKey: "id_user"
        });
    }
    
    return Producto;
};