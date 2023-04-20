import {getApiDao} from "../model/index.js";
import { DB } from "../model/config/envConfig.js";

//options.server.DB_TYPE

const {ContenedorDaoCarts} = await getApiDao(DB);

class CarritoService{
    static async createCart(id){
        const prods = await ContenedorDaoCarts.createCart(id);
        return prods;
    }

    static async getProducts(id){
        const prod = await ContenedorDaoCarts.getProducts(id);
        return prod;
    }

    static async total(id){
        const prod = await ContenedorDaoCarts.total(id);
        return prod;
    }

    static async saveProd(id, obj){
        return await ContenedorDaoCarts.saveProd(id, obj)
    }
    

    static async getById(id){
        return await ContenedorDaoCarts.getById(id, obj)
    }

    static async editProduct(id, obj){
        const prod = await ContenedorDaoCarts.editById(id, obj);
        return prod;
    }

    static async deleteCart(id){
        const prod = await ContenedorDaoCarts.deleteCart(id);
        return prod;
    }

    static async deleteProdByiD(idUser, prodName){
        const prod = await ContenedorDaoCarts.deleteProdByiD(idUser,prodName);
        return prod;
    }

    
};

export {CarritoService}