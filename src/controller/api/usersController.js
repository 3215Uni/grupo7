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
            res.json({
                status:200,
                count:users.length,
                data:users.map(user => ({
                    id: user.id,
                    name:user.name,
                    email:user.email,
                    userName: user.user_name,
                    lastName: user.last_name,
                    detail:`/api/users/${user.id}`
                }))
            });

        } catch (error) {
            res.send(error);
        }
    },
    async getUser(req,res){
        try {
            const user = await db.Usuario.findByPk(req.params.id);
            if(!user){
                return res.status(404).send({message:'User not found'})
            }else{
                const userDetail = {
                    id: user.id,
                    name:user.name,
                    lastName:user.lastName,
                    date:user.date,
                    email:user.email,
                    phone:user.phone,
                    image:`/api/users/${user.id}/${user.image}`  
                };
                res.json(userDetail);
            }
        } catch (error) {
            res.send(error);
        }
    }

}

module.exports = usuarios;