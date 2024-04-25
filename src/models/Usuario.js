module.exports = function(sequelize, dataTypes){
    let alias="Usuarios";
    let cols={
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: dataTypes.STRING
        },
        last_name: {
            type: dataTypes.STRING
        },
        birthday: {
            type: dataTypes.DATE
        },
        email:{
            type: dataTypes.STRING
        },
        phone:{
            type: dataTypes.INTEGER
        },
        user_name: {
            type: dataTypes.STRING
        },
        password: {
            type: dataTypes.STRING
        },
        image:{
            type: dataTypes.STRING
        }       
    }  
    let config={
        tableName: "usuarios",
        timestaps: false
    }
    
    let Usuarios=sequelize.define(alias, cols, config);
    
    Usuario.associate=function(models){
        Usuario.hasMany(models.Producto,{
            as:"productos",
            foreignKey: "id_user"
        })
        Usuario.hasMany(models.Factura,{
            as:"facturas",
            foreignKey: "id_usuario"
        })
    }


    return Usuarios;
};