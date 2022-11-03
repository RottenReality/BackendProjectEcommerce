const cla = require('./ej');
const express = require('express');

const { Router } = require('express');

const PORT = 8080;const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static("public"));

app.listen(PORT, ()=>{
    console.log(`Servidor escuchando el puerto: ${PORT}`);
})

let ob = new cla.Contenedor()

const routerProductos = Router();


routerProductos.get('/', (req, res) =>{
    const listProductos = ob.getAll();
    res.json(listProductos)
})

routerProductos.get('/:id', (req, res) =>{
    const id = parseInt(req.params.id);
    const pro = ob.getById(id);
    res.json(pro)
})

routerProductos.post('/',(req,res)=>{
    let productoNuevo = req.body;
    let productoAgregado = ob.save(productoNuevo);
    res.json(productoAgregado)
})

routerProductos.put('/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    let productoNuevo = req.body;
    let productoEditado = ob.editById(id, productoNuevo);
    res.json(productoEditado)
})


routerProductos.delete('/:id',(req,res)=>{
    let id = parseInt(req.params.id);
    const mensaje = ob.deleteByiD(id);
    res.json(mensaje)
})


app.use('/api/productos', routerProductos);