import { ContenedorProducts } from "../../managers/mongo.manager.js";

class ProductsDAOMongo extends ContenedorProducts{
    constructor(dbInfo){
        super(dbInfo);
    }
}

export {ProductsDAOMongo};