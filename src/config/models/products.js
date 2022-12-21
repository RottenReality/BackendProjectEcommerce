import mongoose, { mongo } from "mongoose";

const productsCollection = "products";

const productsSchema = new mongoose.Schema(
    {
        title:String,
        description:String,
        price:Integer,
        stock:Integer,
        thumbnail:String,
        timestamp:String
    }
);

export const ProductsModel = mongoose.model(productsCollection, productsSchema);