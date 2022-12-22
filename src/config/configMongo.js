import mongoose from "mongoose";
import { ProductsModel } from "./models/products.js";
import { CartsModel } from "./models/carts.js";

mongoose.connect("mongodb+srv://rottenreality:BgkBxsB9PWTvBNoW@coderbackend.oorljea.mongodb.net/ecommerce?retryWrites=true&w=majority",
{
    useNewUrlParser:true,
    useUnifiedTopology: true
}, error=>{
    if(error) return console.log("error al conectarse a mongo atlas");
    console.log("conexion exitosa");
})

let products = ProductsModel;
let carts = CartsModel;

export {products, carts};