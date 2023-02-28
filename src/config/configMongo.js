import mongoose from "mongoose";
import { ProductsModel } from "./models/products.js";
import { CartsModel } from "./models/carts.js";
import { UserModel } from "./models/user.js";
import { logger } from "../loggers/logger.js";

const url = "mongodb+srv://rottenreality:BgkBxsB9PWTvBNoW@coderbackend.oorljea.mongodb.net/ecommerce?retryWrites=true&w=majority"

mongoose.connect(url,
{
    useNewUrlParser:true,
    useUnifiedTopology: true
}, error=>{
    if(error) return logger.error("error al conectarse a mongo atlas");
    logger.info("conexion exitosa");
})

let products = ProductsModel;
let carts = CartsModel;
let users = UserModel;

export {products, carts, users, url};