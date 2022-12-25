import express from 'express';

import { Router } from 'express';
import { ContenedorDaoProducts, ContenedorDaoCarts } from './daos/index.js';

const PORT = 8080;
//const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static("public"));

app.listen(PORT, ()=>{
    console.log(`Servidor escuchando el puerto: ${PORT}`);
})


const prods = ContenedorDaoProducts;
const carts = ContenedorDaoCarts;

const routerProductos = Router();
const routerCarrito = Router();

let administrador = false;


routerProductos.get('/',  async (req, res) =>{
    const listProductos = await prods.getAll();
    res.json(listProductos)
})

routerProductos.get('/:id', async (req, res) =>{
    const id = parseInt(req.params.id);
    const pro = await prods.getById(id);
    res.json(pro)
})

routerProductos.post('/', async (req,res)=>{
    let productoNuevo = req.body;
    productoNuevo.timestamp = Date.now();
    let productoAgregado = await prods.save(productoNuevo);
    res.json(productoAgregado)                      ;
})

routerProductos.put('/:id', async (req,res)=>{
    const id = parseInt(req.params.id);
    let productoNuevo = req.body;
    productoNuevo.timestamp = Date.now();
    let productoEditado = await prods.editById(id, productoNuevo);
    res.json(productoEditado)
})


routerProductos.delete('/:id', async (req,res)=>{
    let id = parseInt(req.params.id);
    const mensaje = await prods.deleteByiD(id);
    res.json(mensaje);
})

//----carrito----

routerCarrito.post('/', async (req,res)=>{
    const newCart = await carts.createCart();

    if(typeof(newCart) == 'string'){
        res.send(newCart);
     }else{
        res.json(newCart.id);
     }

})

routerCarrito.delete('/:id', async (req,res)=>{
    const id = parseInt(req.params.id);
    const result = await carts.deleteCart(id);

    res.json(result);

})

routerCarrito.get('/:id/productos', async (req, res) =>{
    const id = parseInt(req.params.id);
    const productos = await carts.getProducts(id);
    res.json(productos);
})

routerCarrito.post('/:id/productos', async (req,res)=>{
    const idCart = parseInt(req.params.id);
    const id = parseInt(req.body.id);
    const obt = await prods.getById(id);


    const guard = await carts.saveProd(idCart, obt);

    if(typeof(guard) == 'string'){
        res.send(guard);
     }else{
        res.json(guard);
     }


})

routerCarrito.delete('/:id/productos/:id_prod', async (req,res)=>{
    const idCart = parseInt(req.params.id);
    const idProd = parseInt(req.params.id_prod);
    const result = await carts.deleteProdByiD(idCart, idProd);

    res.send(result);

})


app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarrito);