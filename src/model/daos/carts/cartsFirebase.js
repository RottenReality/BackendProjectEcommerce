import { ContenedorCarts } from "../../managers/firebase.manager.js";

class CartsDAOFirebase extends ContenedorCarts{
    constructor(dbInfo){
        super(dbInfo);
    }
}

export {CartsDAOFirebase};