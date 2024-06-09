const db = require('../../database/models');

const usuarios = {
    /*async create(req,res){
        try{
            res.send(req.body);
        }catch(error){
            res.send(error);
        }
    },*/
    async getUsers(req,res){
        try {
            const users = await db.Usuario.findAll();
            const response = {
                meta:{
                    status: 200,
                    total: users.length,
                    detail: 'api/users'
                },
                data: users
            }
            res.send(response);
        } catch (error) {
            res.send(error);
        }
    },
    async getUser(req,res){
        try {
            const user = await db.Usuario.findByPk(req.params.id);
            if(!user){
                return res.status(404).send({message:'User not found'})
            }
            res.send(user);
        } catch (error) {
            res.send(error);
        }
    }

}

module.exports = usuarios;