import { ContenedorProducts } from "../../managers/firebase.manager.js";

class ProductsDAOFirebase extends ContenedorProducts{
    constructor(dbInfo){
        super(dbInfo);
    }
}

export {ProductsDAOFirebase};