/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize/types'.DataTypes)} dataTypes 
 * 
 */



module.exports = function(sequelize, dataTypes){
    let alias="Marca";
    let cols={
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: dataTypes.STRING
        },
        
    }  
    let config={
        timestamps: false,
        tableName: "marcas"
        
    }
    
    let Marca=sequelize.define(alias, cols, config);
    


    Marca.associate=function(models){
        Marca.hasMany(models.Producto,{
            as:"productos",
            foreignKey: "id_marca"
        })
    }



    return Marca;
};