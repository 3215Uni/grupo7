/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize/types'.DataTypes)} dataTypes 
 * 
 */






module.exports = function(sequelize, dataTypes){
    let alias="Usuario";
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
        timestamps: false
    }
    
    let Usuario=sequelize.define(alias, cols, config);
    
    Usuario.associate=function(models){
        Usuario.hasMany(models.Producto,{
            as:"productos",
            foreignKey: "id_user"
        })
        Usuario.hasOne(models.Carrito,{
            as:"Carrito",
            foreignKey: "id_usuario"
        })
    }


    return Usuario;
};