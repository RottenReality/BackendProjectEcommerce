import {getApiDao} from "../model/index.js";
import { DB } from "../model/config/envConfig.js";
//options.server.DB_TYPE

const {ContenedorDaoUsers} = await getApiDao(DB);

class AuthService{
    static async getAll(){
        const users = await ContenedorDaoUsers.getAll();
        return users;
    }

    static async getById(id){
        const user = await ContenedorDaoUsers.getById(id);
        return user;
    }

    
};

export {AuthService}