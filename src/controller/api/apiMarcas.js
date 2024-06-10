const db = require('../../database/models');

const marcas = {
    /*async create(req,res){
        try{
            res.send(req.body);
        }catch(error){
            res.send(error);
        }
    },*/
    async getMarcas(req,res){
        try {
            const marcas = await db.Marca.findAll();
            res.json({
                status:200,
                count:marcas.length,
                data:marcas.map(marca => ({
                    id: marca.id,
                    name:marca.name,
                    
                }))
            });

        } catch (error) {
            res.send(error);
        }
    },
    async getMarca(req,res){
        try {
            const marca = await db.Marca.findByPk(req.params.id);
            if(!marca){
                return res.status(404).send({message:'Marca not found'})
            }else{
                const marcaDetail = {
                    id: user.id,
                    name:user.name,
                };
                res.json(userDetail);
            }
        } catch (error) {
            res.send(error);
        }
    }

}

module.exports = marcas;