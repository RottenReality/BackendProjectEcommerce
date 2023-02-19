import express from 'express';
import { ContenedorDaoProducts } from '../daos/index.js';
import { checkUserLogged } from "../middlewares/authMidd.js";

const prods = ContenedorDaoProducts

const routerProductos = express.Router();

routerProductos.get('/', checkUserLogged,  async (req, res) =>{
    const listProductos = await prods.getAll();
    res.json(listProductos)
})

routerProductos.get('/:id', async (req, res) =>{
    const id = req.params.id;
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
    const id = req.params.id;
    let productoNuevo = req.body;
    productoNuevo.timestamp = Date.now();
    let productoEditado = await prods.editById(id, productoNuevo);
    res.json(productoEditado)
})


routerProductos.delete('/:id', async (req,res)=>{
    let id = req.params.id;
    const mensaje = await prods.deleteByiD(id);
    res.json(mensaje);
})

export{ routerProductos};