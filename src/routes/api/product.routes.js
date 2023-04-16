import express from 'express';
import {checkUserLogged} from '../../middlewares/authMidd.js';

import { ProductController } from '../../controllers/product.controller.js';

const productRouter = express.Router();

productRouter.get('/', checkUserLogged, ProductController.getProducts);
productRouter.get("/:id", ProductController.getProdById);
productRouter.post("/", ProductController.saveProd);
productRouter.put("/:id", ProductController.editProdById);
productRouter.delete('/:id', ProductController.deleteProdById);



export { productRouter };