import express from 'express';
import { ContenedorDaoCarts, ContenedorDaoUsers } from '../daos/index.js';
import {checkUserLogged} from '../middlewares/authMidd.js'
import { twilioClient, twilioPhone, twilioWp, adminWp } from '../messages/sms.js';
import { transporter, email, pass } from "../messages/email.js";
import { logger } from '../loggers/logger.js';

const carts = ContenedorDaoCarts;
const users = ContenedorDaoUsers;

const routerCarrito = express.Router();

routerCarrito.get('/cart', checkUserLogged, async (req, res) =>{
    const id = req.session.passport.user
    const carrito = await carts.getProducts(id);
    const total = await carts.total(id)
    if(carrito.length == 0){
        res.render("emptyCart");
    }
    else{
        res.render("cart", { carrito, total });
    }
})

routerCarrito.post('/cart', async (req, res) =>{
    const { name, price, quantity, thumbnail } = req.body;
    const id = req.session.passport.user
    const producto = {
        name: name,
        price: price,
        quantity: quantity,
        thumbnail: thumbnail
    }
    carts.saveProd(id, producto)
})

routerCarrito.post('/ready', async (req,res)=>{
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

})

routerCarrito.post('/', async (req,res)=>{
    const newCart = await carts.createCart();

    if(typeof(newCart) == 'string'){
        res.send(newCart);
     }else{
        res.json(newCart.id);
     }

})

routerCarrito.delete('/:id', async (req,res)=>{
    const id = req.params.id;
    const result = await carts.deleteCart(id);

    res.json(result);

})

routerCarrito.get('/:id/productos', async (req, res) =>{
    const id = req.params.id;
    const productos = await carts.getProducts(id);
    res.json(productos);
})

routerCarrito.post('/:id/productos', async (req,res)=>{
    const idCart = req.params.id;
    const id = req.body.id;
    const obt = await prods.getById(id);


    const guard = await carts.saveProd(idCart, obt);

    if(typeof(guard) == 'string'){
        res.send(guard);
     }else{
        res.json(guard);
     }


})

routerCarrito.delete('/:id/productos/:id_prod', async (req,res)=>{
    const idCart = req.params.id;
    const idProd = req.params.id_prod;
    const result = await carts.deleteProdByiD(idCart, idProd);

    res.send(result);

})

export{ routerCarrito};