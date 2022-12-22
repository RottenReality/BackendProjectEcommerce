import { Contenedor } from "../../managers/contenedorProductos.js";

class ProductsDAOArchivos extends Contenedor{
    constructor(filepath){
        super(filepath);
    }
}

export {ProductsDAOArchivos};