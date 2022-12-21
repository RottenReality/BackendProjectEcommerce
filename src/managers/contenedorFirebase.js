
class ContenedorProducts{

    constructor (db){
        this.db = db;
        
    };

    async save(objeto){
        try{
            const userCollection = db.collection("products");
            const doc = userCollection.doc();
            await doc.create({
                title: objeto.title, 
                description: objeto.description,
                price: objeto.price,
                stock: objeto.stock,
                timestamp: objeto.timestamp,
                thumbnail: objeto.thumbnail
            });
            return "Producto agregado con éxito"
        } catch (error) {
            return "error, producto no se pudo guardar."
        }

    }

    async getAll(){
        try {
            const userCollection = db.collection("products");
            const snapshot = await userCollection.get();
            const docs = snapshot.docs;
            let products = docs.map(doc=>{
                return{
                    id:doc.id,
                    title: doc.data().title,
                    description: doc.data().description,
                    price: doc.data().price,
                    stock: doc.data().stock,
                    thumbnail: doc.data().thumbnail,
                    timestamp: doc.data().timestamp,
                }
            })
            if(products.length > 0){
                return productos;
            } else{
                return [];
            }
            
        } catch (error) {
            return "error en lectura de productos"
        }
        
    }

    async getById(idProd){
        try {
            const lista = await this.getAll();
            const pro = lista.find((elemento)=>elemento.id === idProd);
            return pro;
        } catch (error) {
            return "no se encuentra producto"
        }
    }

    async editById(id, obj){
        try {
            const userCollection = db.collection("products");
            const doc = userCollection.doc(id);
            let result = await doc.update({
                title: obj.title,
                description: obj.description,
                price: obj.price,
                stock: obj.stock,
                thumbnail: obj.thumbnail,
                timestamp: obj.timestamp
            })
        } catch (error) {
            return {"error":"producto no encontrado"}
        }
    }

    async deleteByiD(id){
        try{
            const userCollection = db.collection("products");
            const doc = userCollection.doc(id);
            let result = await doc.delete();
            return "Producto eliminado con éxito";
        } catch (error){
            return {"error":"no se puede eliminar"}
        }
    }

    async deleteAll(){
        
    }
    
}

//--------------------------------------------------


class ContenedorCarts{

    constructor (dbc){
        this.dbc = dbc;
        
    };

    async saveProd(idCart, prod){
        
        try{
            const userCollection = dbc.collection("carts");
            const pros = this.getProducts(idCart);
            
            pros.push(prod);
            const doc = userCollection.doc(idCart);
            let result = await doc.update({
                products: pros
            })

            return result;


        } catch (error) {
            return "error, no se pudo guardar."
        }
    }

    async createCart(){
        try{
            const userCollection = dbc.collection("carts");
            const doc = userCollection.doc();
            return "Carrito creado con éxito"
            
        } catch (error) {
            return "error, no se pudo crear."
        }
    }

    async getProducts(idCart){
        try {
            const carrito = await this.getAll();
            const filtCart = carrito.find(elemento=>elemento.id === idCart);
            return filtCart.products;
        } catch (error) {
            return "no se encuentra carrito"
        }
    }


    async getAll(){
        try {
            const userCollection = dbc.collection("carts");
            const snapshot = await userCollection.get();
            const docs = snapshot.docs;
            let carts = docs.map(doc=>{
                return{
                    id:doc.id,
                    timestamp: doc.data().timestamp,
                    products: doc.data().products
                }
            })
            if(carts.length > 0){
                return carts;
            } else{
                return [];
            }
            
        } catch (error) {
            return "error en lectura de carros"
        }
        
    }

    async getById(id){
        try {
            const carrito = await this.getAll();
            const filtCart = carrito.find(elemento=>elemento.id === id);
            return filtCart;
        } catch (error) {
            return "no se encuentra carrito"
        }
    }

    async editById(id, obj){
        try {
            const userCollection = dbc.collection("products");
            const doc = userCollection.doc(id);
            let result = await doc.update({
                timestamp: obj.timestamp,
                products: obj.products
            })
            return "editado con éxito"
        } catch (error) {
            return {"error":"producto no encontrado"}
        }
    }

    async deleteProdByiD(idCart, idProd){

        try{
            const userCollection = dbc.collection("carts");
            const pros = this.getProducts(idCart);
            
            pros.filter(elemento=>elemento.id != idProd);
            const doc = userCollection.doc(idCart);
            await doc.update({
                products: pros
            })

            return "producto eliminado con éxito";


        } catch (error) {
            return "error, no se pudo eliminar producto."
        }
    }

    async deleteCart(idCart){
        try{
            const userCollection = dbc.collection("carts");
            const doc = userCollection.doc(id);
            let result = await doc.delete();
            return "carrito eliminado con éxito";
        } catch (error){
            return {"error":"no se puede eliminar"}
        }
        
    }
    
}




module.exports={ ContenedorProducts, ContenedorCarts }