import { ContenedorCarts } from "../../managers/contenedorFirebase.js";

class CartsDAOFirebase extends ContenedorCarts{
    constructor(dbInfo){
        super(dbInfo);
    }
}

export {CartsDAOFirebase};