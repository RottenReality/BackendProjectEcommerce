import {getApiDao} from "../model/index.js";
import { envConfig } from "../model/config/envConfig.js";
//options.server.DB_TYPE

const {ContenedorDaoUsers} = await getApiDao(envConfig.DB_TYPE);

class AuthService{
    static async getAll(){
        const prods = await ContenedorDaoUsers.getAll();
        return prods;
    }

    static async getById(id){
        const prod = await ContenedorDaoUsers.getById(id);
        return prod;
    }

    
};

export {AuthService}