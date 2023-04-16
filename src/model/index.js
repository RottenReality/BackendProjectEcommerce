

export async function getApiDao(dbType){
    let ContenedorDaoProducts;
    let ContenedorDaoCarts;
    let ContenedorDaoUsers;

    switch(dbType){
        case "filesystem":
            const {ProductsDAOArchivos} = await import("./daos/products/productsArchivos.js");
            const {CartsDAOArchivos} = await import("./daos/carts/cartsArchivos.js");
    
            ContenedorDaoProducts = new ProductsDAOArchivos("./src/files/productos.txt");
            ContenedorDaoCarts = new CartsDAOArchivos("../files/carrito.txt");
        break;
    
        case "firebase":
            const {ProductsDAOFirebase} = await import("./daos/products/productsFirebase.js");
            const {CartsDAOFirebase} = await import("./daos/carts/cartsFirebase.js");
            const {db} = await import("./config/configFirebase.js")
    
            ContenedorDaoProducts = new ProductsDAOFirebase(db);
            ContenedorDaoCarts = new CartsDAOFirebase(db);
        break;
    
        case "mongo":
            const {ProductsDAOMongo} = await import("./daos/products/productsMongo.js");
            const {CartsDAOMongo} = await import("./daos/carts/cartsMongo.js");
            const {UsersDAOMongo} = await import("./daos/users/userMongo.js");
            const {products, carts, users} = await import("./config/configMongo.js");
    
            ContenedorDaoProducts = new ProductsDAOMongo(products);
            ContenedorDaoCarts = new CartsDAOMongo(carts);
            ContenedorDaoUsers = new UsersDAOMongo(users);
        break;
    }

    return {ContenedorDaoProducts, ContenedorDaoCarts, ContenedorDaoUsers};
};