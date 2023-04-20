import { isObjectIdOrHexString } from "mongoose";
import { logger } from '../../loggers/logger.js';

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
            logger.error(error)
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

    async createCart(usuario){
        try{
            const cart = {
                user: usuario,
                timestamp: Date.now(),
                products: []
            }

            await this.model.create(cart);
            return cart;
        } catch(error){
            logger.error(error)
            return "Error al crear carrito";
        }
    }

    async saveProd(idCart, prod) {
        try {
          await this.model.findOneAndUpdate(
            {
              user: idCart,
              products: { $elemMatch: { name: prod.name } }
            },
            { $inc: { "products.$.quantity": prod.quantity } }
          );
          await this.model.findOneAndUpdate(
            { user: idCart, products: { $not: { $elemMatch: { name: prod.name } } } },
            { $push: { products: prod } }
          );
        } catch (error) {
          logger.error(error);
          throw new Error("error, no se pudo guardar.");
        }
      }

    async total(idUser){
        try{
            let total = 0;
            const cart = await this.getById(idUser);
            if(cart.products.length > 0){
                cart.products.forEach(producto => total = total + (+producto.price));
            }

            return total;

        } catch (error) {
            return "error, no se pudo sacar total."
        }
    }



    async getProducts(idUser){
        try {
            const filtCart = await this.model.findOne({user : idUser})
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

    async getById(idUser){
        try {
            const carrito = await this.model.findOne({user:idUser})
            return carrito;
        } catch (error) {
            logger.error(error)
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

    async deleteProdByiD(idUser, prodName){

        try{
            const pros = this.getProducts(idUser);
            const cart = this.getById(idUser)
            const ed = pros.filter(elemento=>elemento.name != prodName);
            pros.products = ed;
            await this.model.updateById(cart._id, pros);
             

            return "producto eliminado con éxito";


        } catch (error) {
            return "error, no se pudo eliminar producto."
        }
    }

    async deleteProds(idCart) {
        const prod = []
        try {
            const cart = await this.model.findOneAndUpdate(
                { user: idCart },
                { $set: { products: prod } },
                { new: true }
            );
        } catch (error) {
            logger.error(error);
            return "error, no se pudo borrar productos.";
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

//---------------------------------------------------------------------------------------

class ContenedorUsers{

    constructor (model){
        this.model = model;
        
    };

    async getAll(){
        try {
            let users = await this.model.find()
            if(users.length > 0){
                return users
            } else{
                return [];
            }
        } catch (error) {
            return "error en lectura de usuarios"
        }
        
    }

    async getById(id){
        try {
            const user = await this.model.findOne({_id:id})
            return user
        } catch (error) {
            logger.error(error)
            return "no se encuentra usuario"
        }
    }



}



export{ ContenedorProducts, ContenedorCarts, ContenedorUsers };