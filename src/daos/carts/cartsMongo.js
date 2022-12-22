import { ContenedorCarts } from "../../managers/contenedorMongo.js";

class CartsDAOMongo extends ContenedorCarts{
    constructor(dbInfo){
        super(dbInfo);
    }
}

export {CartsDAOMongo};