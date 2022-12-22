import mongoose, { mongo } from "mongoose";

const productsCollection = "products";

const productsSchema = new mongoose.Schema(
    {
        title:String,
        description:String,
        price:Number,
        stock:Number,
        thumbnail:String,
        timestamp:String
    }
);

const ProductsModel = mongoose.model(productsCollection, productsSchema);

export {ProductsModel};