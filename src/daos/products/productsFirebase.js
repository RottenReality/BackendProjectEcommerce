import { ContenedorProducts } from "../../managers/contenedorFirebase.js";

class ProductsDAOFirebase extends ContenedorProducts{
    constructor(dbInfo){
        super(dbInfo);
    }
}

export {ProductsDAOFirebase};