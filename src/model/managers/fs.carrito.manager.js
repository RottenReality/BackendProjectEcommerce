import fs from "fs"
class Contenedor{

    constructor (filename){
        this.filename = filename
    };

    async saveProd(idCart, prod) {
        try {
          const carts = await this.getAll();
      
          const cartIndex = carts.findIndex(cart => cart.id === idCart);
      
          if (cartIndex < 0) {
            return "El carrito no existe";
          }
      
          const carrito = carts[cartIndex];
      
          const productIndex = carrito.products.findIndex(product => product.name === prod.name);
      
          if (productIndex >= 0) {
            carrito.products[productIndex].quantity += prod.quantity;
          } else {
            carrito.products.push(prod);
          }
      
          carts[cartIndex] = carrito;
      
          await fs.promises.writeFile(this.filename, JSON.stringify(carts, null, 2));
      
          return carrito;
        } catch (error) {
          return "Error, no se pudo guardar.";
        }
      }

    async createCart(id){

        let rito = {};

        try{
            if(fs.existsSync(this.filename)){
                const carrito = await this.getAll();
                if(carrito.length > 0){
                    const lastId = parseInt(carrito[carrito.length-1].id) + 1;
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
            const filtCart = carrito.find(elemento=>elemento.id === parseInt(idCart));
            
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
            const filtCart = carrito.find(elemento=>elemento.id === parseInt(id));
            return filtCart;
        } catch (error) {
            return "no se encuentra carrito"
        }
    }

    async total(idUser){
        try{
            let total = 0;
            const cart = await this.getById(idUser);
            if(cart.products.length > 0){
                cart.products.forEach(producto => total = total + (+producto.price * producto.quantity));
            }

            return total;

        } catch (error) {
            return "error, no se pudo sacar total."
        }
    }

    async editById(id, obj){
        try {
            const productos = await this.getAll();
            if(id <= productos.length){
                productos[parseInt(id) - 1] = obj
                return " carrito editado con éxito"
            }
            else{
                return {"error":"carrito no encontrado"}
            }
            
        } catch (error) {
            return {"error":"producto no encontrado"}
        }
    }

    async deleteProdByiD(idCart, idProd){

        try{
            let lista = await this.getAll();

            let filtCart = await this.getById(idCart);
            const prods = filtCart.products.filter(elemento=>elemento.id !== parseInt(idProd))

            filtCart.products = prods;

            lista[parseInt(idCart) - 1] = filtCart;

            fs.promises.writeFile(this.filename, JSON.stringify(lista, null, 2));
            return "Producto eliminado con éxito";

        } catch (error){
            return "no se puede eliminar producto";
        }
    }

    async deleteCart(idCart){
        try{
            const list = await this.getAll();
            const filtered = list.filter((element)=>element.id !== parseInt(idCart))
            fs.promises.writeFile(this.filename, JSON.stringify(filtered, null, 2))
            return "carrito eliminado";
        } 
        catch {
            return "no se pudo eliminar carrito";
        }
        
    }
    
}


export{Contenedor};