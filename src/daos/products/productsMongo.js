import { ContenedorProducts } from "../../managers/contenedorMongo.js";

class ProductsDAOMongo extends ContenedorProducts{
    constructor(dbInfo){
        super(dbInfo);
    }
}

export {ProductsDAOMongo};