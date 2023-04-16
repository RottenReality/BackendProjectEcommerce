import { ContenedorUsers } from "../../managers/mongo.manager.js";

class UsersDAOMongo extends ContenedorUsers{
    constructor(dbInfo){
        super(dbInfo);
    }
}

export {UsersDAOMongo};