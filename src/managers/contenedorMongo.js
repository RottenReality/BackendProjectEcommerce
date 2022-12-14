import { isObjectIdOrHexString } from "mongoose";

class ContenedorProducts{

    constructor (model){
        this.model = model;
        
    };

    async save(objeto){
        try{
            await this.model.create(objeto);
            return "producto guardado con éxito";
        } catch(error){
            return "error, no se pudo guardar";
        }
    }

    async getAll(){
        try {
            let prods = await this.model.find()
            if(prods.length > 0){
                return prods
            } else{
                return [];
            }
        } catch (error) {
            return "error en lectura de productos"
        }
        
    }

    async getById(idProd){
        try {
            const product = await this.model.findOne({_id:idProd})
            return product
        } catch (error) {
            console.log(error)
            return "no se encuentra producto"
        }
    }

    async editById(id, obj){
        try {
            this.model.updateOne(
                {_id : id}, 
                {
                    $set: {
                        title: obj.title, 
                        thumbnail: obj.thumbnail, 
                        price: obj.price, 
                        code: obj.code, 
                        description: obj.description, 
                        stock: obj.stock
                    }
                }
            );
            return {"ok":"editado con éxito"}
        } catch (error) {
            return {"error":"producto no encontrado"}
        }
    }

    async deleteByiD(id){
        try{
            await this.model.deleteOne({_id:id});
            return "Producto eliminado con éxito";
        } catch (error){
            return {"error":"no se puede eliminar"}
        }
    }

    async deleteAll(){
        await this.model.deleteMany({});
        return "datos eliminados";
    }
    
}

//--------------------------------------------------


class ContenedorCarts{

    constructor (model){
        this.model = model;
        
    };

    async createCart(){
        try{
            const cart = {
                timestamp: Date.now(),
                products: []
            }

            await this.model.create(cart);
            return cart;
        } catch(error){
            console.log(error)
            return "Error al crear carrito";
        }
    }

    async saveProd(idCart, prod){
        
        try{
            const cart = await this.getById(idCart);
            let prods = cart.products;
            prods.push(prod);

            let result = this.model.updateOne({_id : idCart}, {$set: {"producto": prods}});

            return result;


        } catch (error) {
            return "error, no se pudo guardar."
        }
    }


    async getProducts(idCart){
        try {
            const carrito = await this.getAll();
            const filtCart = carrito.find(elemento=>elemento.id == idCart);
            return filtCart.products;
        } catch (error) {
            return "no se encuentra carrito"
        }
    }


    async getAll(){
        try {
            let carts = await this.model.find()
            if(carts.length > 0){
                return carts
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
            this.model.updateOne({_id : id}, {$set: {"productos": obj}});
            return "editado con éxito"
        } catch (error) {
            return {"error":"producto no encontrado"}
        }
    }

    async deleteProdByiD(idCart, idProd){

        try{
            const pros = this.getById(idCart);
            const ed = pros.filter(elemento=>elemento.id != idProd);
            pros.products = ed;
            await this.model.updateById(idCart, pros.productos);
             

            return "producto eliminado con éxito";


        } catch (error) {
            return "error, no se pudo eliminar producto."
        }
    }

    async deleteCart(idCart){
        try{
            await this.model.deleteOne({_id : idCart})
            return "carrito eliminado con éxito";
        } catch (error){
            return {"error":"no se puede eliminar"}
        }
        
    }
    
}



export{ ContenedorProducts, ContenedorCarts };