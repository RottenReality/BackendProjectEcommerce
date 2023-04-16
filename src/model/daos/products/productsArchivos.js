import { Contenedor } from "../../managers/fs.product.manager.js";

class ProductsDAOArchivos extends Contenedor{
    constructor(filepath){
        super(filepath);
    }
}

export {ProductsDAOArchivos};