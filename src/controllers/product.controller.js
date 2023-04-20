import { ProductService } from '../services/product.service.js';
import { DB } from '../model/config/envConfig.js';

const prods = ProductService;

class ProductController{
    

    static getProducts = async (req, res) => {
        const listProductos = await prods.getProducts();
        if(DB == "mongo"){
            res.render("prods", {productos: listProductos.map(producto => producto.toJSON())})
        } else{
            res.render("prods", {productos: listProductos.map(producto => producto)})
        }
        
    }

    static getProdById = async (req, res) => {
        const id = req.params.id;
        const pro = await prods.getProduct(id);
        res.json(pro)    
    }

    static saveProd = async (req, res) => {
        let productoNuevo = req.body;
        productoNuevo.timestamp = Date.now();
        let productoAgregado = await prods.saveProduct(productoNuevo);
        res.json(productoAgregado);
    }

    static editProdById = async (req, res) => {
        const id = req.params.id;
        let productoNuevo = req.body;
        productoNuevo.timestamp = Date.now();
        let productoEditado = await prods.editProduct(id, productoNuevo);
        res.json(productoEditado)
    }

    static deleteProdById = async (req, res) => {
        let id = req.params.id;
        const mensaje = await prods.deleteProduct(id);
        res.json(mensaje);
    }

    

}

export {ProductController}