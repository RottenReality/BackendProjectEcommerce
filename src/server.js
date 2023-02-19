import express from 'express';
import { logger } from './loggers/logger.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { url } from './config/configMongo.js';
import passport from 'passport';


import { routerProductos } from './routes/products.js';
import { routerCarrito } from './routes/carritos.js';
import { authRouter } from './routes/auth.js';


//const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.use(session({
    store:MongoStore.create({
        mongoUrl:url
    }),
    secret:"claveSecreta",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());


app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarrito);
app.use('/api/auth', authRouter);

const PORT = 8080;
app.listen(PORT, ()=>{
    logger.info(`Servidor escuchando el puerto: ${PORT}`);
})

//let administrador = false;