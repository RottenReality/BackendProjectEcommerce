import express from 'express';
import {checkUserLogged} from '../../middlewares/authMidd.js';

import { CarritoController } from '../../controllers/carrito.controller.js';

const carritoRouter = express.Router();

carritoRouter.get('/cart', checkUserLogged, CarritoController.getCart);
carritoRouter.post("/cart", CarritoController.saveCart);
carritoRouter.post("/ready", CarritoController.msgCart);
carritoRouter.post("/", CarritoController.newCart);
carritoRouter.delete('/:id', CarritoController.deleteCart);
carritoRouter.get("/:id/productos", CarritoController.getCartProds);
carritoRouter.post("/:id/productos", CarritoController.saveCartProd);
carritoRouter.delete("/:id/productos/:id_prod", CarritoController.deleteCartProd);



export { carritoRouter };