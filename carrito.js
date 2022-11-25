const fs = require("fs");
class Contenedor{

    constructor (filename){
        this.filename = filename
    };

    async saveProd(idCart, idProd){
        
        try{
            if(fs.existsSync(this.filename)){

                const carrito = await this.getById(idCart);


                if(idProd == "no se encuentra producto"){
                    return "El producto que intenta agregar no existe";

                } else{
                    carrito.products.push(idProd);
                    const carts = await this.getAll();
                    carts[idCart - 1] = carrito;
                    fs.promises.writeFile(this.filename, JSON.stringify(carts, null, 2))
                    return carrito;
                }
            } else {
                carrito.products.push(idProd);
                const carts = await this.getAll();
                carts[idCart - 1] = carrito;
                fs.promises.writeFile(this.filename, JSON.stringify(carts, null, 2))
                return carrito;
            }
        } catch (error) {
            return "error, no se pudo guardar."
        }
    }

    async createCart(){

        let rito = {};

        try{
            if(fs.existsSync(this.filename)){
                const carrito = await this.getAll();
                if(carrito.length > 0){
                    const lastId = carrito[carrito.length-1].id + 1;
                    rito.id = lastId;
                    rito.timestamp = Date.now();
                    rito.products = [];
                    carrito.push(rito);
                    fs.promises.writeFile(this.filename, JSON.stringify(carrito, null, 2))
                    return rito;
                } else{
                    rito.id = 1
                    rito.timestamp = Date.now();
                    rito.products = [];
                    fs.promises.writeFile(this.filename, JSON.stringify([rito], null, 2))
                    return rito;
                }
            } else {
                rito.id = 1
                rito.timestamp = Date.now();
                rito.products = [];
                fs.promises.writeFile(this.filename, JSON.stringify([rito], null, 2))
                return rito;
            }
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
            const contenido = await fs.promises.readFile(this.filename, "utf8");
            if(contenido.length > 0){
                const carrito = JSON.parse(contenido);
                return carrito;
            } else{
                return [];
            }
            
        } catch (error) {
            return "error en lectura del carrito"
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
            const productos = await this.getAll();
            if(id <= productos.length){
                productos[id - 1] = obj
                return " producto editado con éxito"
            }
            else{
                return {"error":"producto no encontrado"}
            }
            
        } catch (error) {
            return {"error":"producto no encontrado"}
        }
    }

    async deleteProdByiD(idCart, idProd){

        try{
            let lista = await this.getAll();

            let filtCart = await this.getById(idCart);
            const prods = filtCart.products.filter(elemento=>elemento.id != idProd)

            filtCart.products = prods;

            lista[idCart - 1] = filtCart;

            fs.promises.writeFile(this.filename, JSON.stringify(lista, null, 2));
            return "Producto eliminado con éxito";

        } catch (error){
            return "no se puede eliminar producto";
        }
    }

    async deleteCart(idCart){
        try{
            const list = await this.getAll();
            const filtered = list.filter((element)=>element.id != idCart)
            fs.promises.writeFile(this.filename, JSON.stringify(filtered, null, 2))
            return "carrito eliminado";
        } 
        catch {
            return "no se pudo eliminar carrito";
        }
        
    }
    
}


module.exports={ Contenedor }