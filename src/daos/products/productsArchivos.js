import {contenedor} from "../../managers/contenedorProductos.js";

class ProductsDAOArchivos extends contenedor{
    constructor(filepath){
        super(filepath);
    }
}

export {ProductsDAOArchivos};