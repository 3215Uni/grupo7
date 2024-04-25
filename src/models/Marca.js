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
        tableName: "marcas",
        timestaps: false
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