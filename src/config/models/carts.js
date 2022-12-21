import mongoose, { mongo } from "mongoose";

const cartsCollection = "carts";

const cartsSchema = new mongoose.Schema(
    {
        timestamp:String,
        products:Arrays
    }
);

export const CartsModel = mongoose.model(cartsCollection, cartsSchema);