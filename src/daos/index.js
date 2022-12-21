
let ContenedorDaoProducts;
let ContenedorDaoCarts;

let databaseType = "filesystem";

switch(databaseType){
    case "filesystem":
        const {ProductsDAOArchivos} = await import("./products/productsArchivos.js");
        const {CartsDAOArchivos} = await import("./carts/cartsArchivos.js");

        ContenedorDaoProducts = new ProductsDAOArchivos("../files/productos.txt");
        ContenedorDaoCarts = new CartsDAOArchivos("../files/carrito.txt");
    break;

    case "firebase":
        const {ProductsDAOFirebase} = await import("./products/productsFirebase.js");
        const {CartsDAOFirebase} = await import("./carts/cartsFirebase.js");

        ContenedorDaoProducts = new ProductsDAOFirebase("../config/configFirebase.js");
        ContenedorDaoCarts = new CartsDAOFirebase("../config/configFirebase.js");
    break;

    case "mongo":
        const {ProductsDAOMongo} = await import("./products/productsMongo.js");
        const {CartsDAOMongo} = await import("./carts/cartsMongo.js");

        ContenedorDaoProducts = new ProductsDAOMongo("../config/configMongo.js");
        ContenedorDaoCarts = new CartsDAOMongo("../config/configMongo.js");
    break;
};

export{ContenedorDaoProducts, ContenedorDaoCarts};