import { ContenedorCarts } from "../../managers/mongo.manager.js";

class CartsDAOMongo extends ContenedorCarts{
    constructor(dbInfo){
        super(dbInfo);
    }
}

export {CartsDAOMongo};