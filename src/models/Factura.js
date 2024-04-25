module.exports = function(sequelize, dataTypes){
    let alias="Factura";
    let cols={
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        fecha_factura: {
            type: dataTypes.DATE
        },
        direccion_factura:{
            type: dataTypes.STRING
        },
        ciudad_facturacion: {
            type: dataTypes.STRING
        },
        provincia_facturacion: {
            type: dataTypes.STRING
        },
        total: {
            type: dataTypes.FLOAT(10,2)
        },
        id_usuario: {
            type: dataTypes.INTEGER
        }
        
    }  
    let config={
        tableName: "facturas",
        
    }
    
    let Factura=sequelize.define(alias, cols, config);
    Factura.associate=function(models){
        Factura.hasMany(models.Carrito,{
            as:"carritos",
            foreignKey: "id_factura"
        })
        Factura.belongsTo(models.Usuario,{
            as:"usuario",
            foreignKey: "id_usuario"
        })
    }
    
    return Factura;
};