import mongoose from "mongoose";
import { ProductsModel } from "../dbModels/products.model.js";
import { CartsModel } from "../dbModels/cart.model.js";
import { UserModel } from "../dbModels/user.model.js";
import { logger } from "../../loggers/logger.js";
import { MONGO_URL } from "./envConfig.js";

const url = MONGO_URL;

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