import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userCollection = "users";

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    nombre:{
        type:String,
        required:true
    },
    direccion:{
        type:String,
    },
    edad:{
        type:Number,
        required:true
    },
    celular:{
        type:String,
        required:true
    },
    avatar:String
});

userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
  };
  
  userSchema.methods.comparePassword= function (password) {
    return bcrypt.compareSync(password, this.password);
  };

export const UserModel = mongoose.model(userCollection, userSchema);