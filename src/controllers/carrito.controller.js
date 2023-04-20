import { CarritoService } from '../services/carrito.service.js';
import { AuthService } from '../services/auth.service.js';
import { twilioClient, twilioPhone, twilioWp, adminWp } from '../messages/sms.js';
import { transporter, email, pass } from "../messages/email.js";
import { logger } from '../loggers/logger.js';


    const carts = CarritoService;
    const users = AuthService;
class CarritoController{
    

    static getCart = async (req, res) => {
        const id = req.session.passport.user
        const carrito = await carts.getProducts(id);
        const total = await carts.total(id)

        
        if(carrito.length == 0){
            res.render("emptyCart");
        }
        else{
            res.render("cart", { carrito, total });
        }
    };

    static saveCart = async (req, res) => {
        const { name, price, quantity, thumbnail } = req.body;
        const id = req.session.passport.user
        const producto = {
            name: name,
            price: price,
            quantity: quantity,
            thumbnail: thumbnail
        }
        carts.saveProd(id, producto)
    };


    static msgCart = async (req, res) => {
        try {
            const idUsuario = req.session.passport.user
            const info = await users.getById(idUsuario)
            const compInfo = await carts.getProducts(idUsuario)
            const compTotal = await carts.total(idUsuario)
    
            //email
            const productsList = compInfo.map(product => `-${product.name} : Cantidad: ${product.quantity}`).join('\n')
            await transporter.sendMail({
                from:"server app Node",
                to:email,
                subject:`Nuevo pedido de ${info.nombre} - ${info.email}`,
                text: `
                    Pedido:
    
                    ${productsList}
    
                    Total: $${compTotal}
                `
            })
            //sms
            await twilioClient.messages.create({
                from:twilioPhone,
                to:`+57${info.celular}`,
                body:"El pedido ha sido recibido y se encuentra en proceso"
            })
            //whatsapp
            await twilioClient.messages.create({
                from:twilioWp,
                to:adminWp,
                body:`Nuevo pedido de ${info.nombre} - ${info.email}`
            })
            carts.deleteProds(idUsuario)
            res.redirect("cart")
        } catch (error) {
            logger.error(`error: ${error}`)
        }
        
    };

    static newCart = async (req, res) => {
        const id = req.session.passport.user
        const newCart = await carts.createCart(id);

        if(typeof(newCart) == 'string'){
            res.send(newCart);
        }else{
            res.json(newCart.id);
        }
    };

    static deleteCart = async (req, res) => {
        const id = req.params.id;
        const result = await carts.deleteCart(id);

        res.json(result);
    };

    static getCartProds = async (req, res) => {
        const id = req.params.id;
        const productos = await carts.getProducts(id);
        res.json(productos);
    };

    static saveCartProd = async (req, res) => {
        const idCart = req.params.id;
        const id = req.body.id;
        const obt = await prods.getById(id);


        const guard = await carts.saveProd(idCart, obt);

        if(typeof(guard) == 'string'){
            res.send(guard);
        }else{
            res.json(guard);
        }
    };

    static deleteCartProd = async (req, res) => {
        const id = req.session.passport.user;
        const {name} = req.body;
        console.log(name)
        const result = await carts.deleteProdByiD(id, name);
        console.log(result)

        res.redirect("/api/carrito/cart");
    };

}

export {CarritoController}