
let ContenedorDaoProducts;
let ContenedorDaoCarts;
let ContenedorDaoUsers;

let databaseType = "mongo";

switch(databaseType){
    case "filesystem":
        const {ProductsDAOArchivos} = await import("./products/productsArchivos.js");
        const {CartsDAOArchivos} = await import("./carts/cartsArchivos.js");

        ContenedorDaoProducts = new ProductsDAOArchivos("./src/files/productos.txt");
        ContenedorDaoCarts = new CartsDAOArchivos("./src/files/carrito.txt");
    break;

    case "firebase":
        const {ProductsDAOFirebase} = await import("./products/productsFirebase.js");
        const {CartsDAOFirebase} = await import("./carts/cartsFirebase.js");
        const {db} = await import("../config/configFirebase.js")

        ContenedorDaoProducts = new ProductsDAOFirebase(db);
        ContenedorDaoCarts = new CartsDAOFirebase(db);
    break;

    case "mongo":
        const {ProductsDAOMongo} = await import("./products/productsMongo.js");
        const {CartsDAOMongo} = await import("./carts/cartsMongo.js");
        const {UsersDAOMongo} = await import("./users/userMongo.js");
        const {products, carts, users} = await import("../config/configMongo.js");

        ContenedorDaoProducts = new ProductsDAOMongo(products);
        ContenedorDaoCarts = new CartsDAOMongo(carts);
        ContenedorDaoUsers = new UsersDAOMongo(users);
    break;
};

export{ContenedorDaoProducts, ContenedorDaoCarts, ContenedorDaoUsers};