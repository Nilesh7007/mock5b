const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

    email:{type:String},
    password:{type:String}

},{
    versionKey:false
})

const UserModel = mongoose.model("User", userSchema);


module.exports = UserModel;

// {
//     "email": "myemail@gmail.com",
//     "password": "1234nil"
// }