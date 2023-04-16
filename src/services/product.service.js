import {getApiDao} from "../model/index.js";
import { envConfig } from "../model/config/envConfig.js";

//options.server.DB_TYPE

const {ContenedorDaoProducts} = await getApiDao(envConfig.DB_TYPE);

class ProductService{
    static async getProducts(){
        const prods = await ContenedorDaoProducts.getAll();
        return prods;
    }

    static async saveProduct(body){
        return await ContenedorDaoProducts.save(body)
    }

    static async getProduct(id){
        const prod = await ContenedorDaoProducts.getById(id);
        return prod;
    }

    static async editProduct(id, obj){
        const prod = await ContenedorDaoProducts.editById(id, obj);
        return prod;
    }

    static async deleteProduct(id){
        const prod = await ContenedorDaoProducts.deleteById(id);
        return prod;
    }

    static async deleteProducts(){
        const prod = await ContenedorDaoProducts.deleteAll();
        return prod;
    }

    
};

export {ProductService}