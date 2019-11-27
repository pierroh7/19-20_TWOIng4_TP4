import UserModel from "../models/user.models.js";

export function findAll((res, req) => {
    UserModel.find({}, (err, users) => {
        if(err){
            returnres.status(500).send({
                message : "Impossible de trouver les utilisateurs"
            })
        }

        return res.status(200).send({data:users})
    });
})