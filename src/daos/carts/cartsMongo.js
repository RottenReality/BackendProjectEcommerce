import { ContenedorCarts } from "../../managers/contenedorMongo.js";

class ProductsDAOMongo extends ContenedorCarts{
    constructor(dbInfo){
        super(dbInfo);
    }
}

export {ProductsDAOMongo};