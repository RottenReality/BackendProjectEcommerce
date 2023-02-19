import express from 'express';
import { ContenedorDaoCarts } from '../daos/index.js';

const carts = ContenedorDaoCarts

const routerCarrito = express.Router();

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