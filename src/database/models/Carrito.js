/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize/types'.DataTypes)} dataTypes  
 * 
 */




module.exports = function(sequelize, dataTypes){
    let alias="Carrito";
    let cols={
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        total: {
            type: dataTypes.FLOAT(10,2)
        },
        id_usuario: {
            type: dataTypes.INTEGER
        }
        
    }  
    let config={
        tableName: "carrito",
        timestamps: false
        
    }
    
    let Carrito=sequelize.define(alias, cols, config);
    
    
    Carrito.associate=function(models){
        Carrito.belongsToMany(models.Producto, { 
            through: 'producto_de_carrito', // Nombre de la tabla intermedia
            foreignKey: 'id_carrito', 
            otherKey: 'id_producto', 
            as: 'productos' // Alias para la relación
        });
        Carrito.belongsTo(models.Usuario,{
            as:"usuario",
            foreignKey: "id_usuario"
        });
      
    };
    
    return Carrito;
};