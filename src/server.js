import express from 'express';
import { logger } from './loggers/logger.js';
import path from 'path';
import { fileURLToPath } from 'url';
import handlebars from 'express-handlebars';


import { routerProductos } from './routes/products.js';
import { routerCarrito } from './routes/carritos.js';
import { authRouter } from './routes/auth.js';


//const PORT = process.env.PORT || 8080;
const app = express();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const viewsFolder = path.join(__dirname, "views");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));



app.engine("handlebars", handlebars.engine());
app.set("views", viewsFolder);
app.set("view engine", "handlebars");


app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarrito);
app.use('/api/auth', authRouter);

const PORT = 8080;
app.listen(PORT, ()=>{
    logger.info(`Servidor escuchando el puerto: ${PORT}`);
})

//let administrador = false;