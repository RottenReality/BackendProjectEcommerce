import express from "express";
import { authRouter } from "./api/auth.routes.js";
import { carritoRouter } from "./api/carrito.routes.js";
import { productRouter } from "./api/product.routes.js";


const router = express.Router();

router.use("/api/auth", authRouter);
router.use("/api/carrito", carritoRouter);
router.use("/api/productos", productRouter);

export {router as apiRouter};