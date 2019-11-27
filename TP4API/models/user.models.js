const mongoose = require('mongoose');

const UserModel = new mongoose.Schema({
    firstname : String,
    lastname :{type : String}
    },
    {
        timestamps: true,
        collection : 'Users'
    }
);

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;