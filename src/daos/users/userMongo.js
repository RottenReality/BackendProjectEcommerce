import { ContenedorUsers } from "../../managers/contenedorMongo.js";

class UsersDAOMongo extends ContenedorUsers{
    constructor(dbInfo){
        super(dbInfo);
    }
}

export {UsersDAOMongo};