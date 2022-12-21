import mongoose from "mongoose";
import { UserModel as productsModel } from "./models/products.js";
import { UserModel as cartsModel } from "./models/carts.js";

mongoose.connect("mongodb+srv://rottenreality:BgkBxsB9PWTvBNoW@coderbackend.oorljea.mongodb.net/ecommerce?retryWrites=true&w=majority",
{
    useNewUrlParser:true,
    useUnifiedTopology: true
}, error=>{
    if(error) return console.log("error al conectarse a mongo atlas");
    console.log("conexion exitosa");
})

let users = productsModel;
let carts = cartsModel;

export {users, carts};