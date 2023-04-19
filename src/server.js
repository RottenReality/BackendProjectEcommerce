import express from 'express';
import { logger } from './loggers/logger.js';
import path from 'path';
import { fileURLToPath } from 'url';
import handlebars from 'express-handlebars';
import session from "express-session";
import passport from "./passport.js";
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import { PORT } from './model/config/envConfig.js';



import { apiRouter } from './routes/index.js';


//const PORT = process.env.PORT || 8080;
const app = express();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const viewsFolder = path.join(__dirname, "views");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(session({
    secret: "claveSecreta",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());



app.engine("handlebars", handlebars.engine());
app.set("views", viewsFolder);
app.set("view engine", "handlebars");


app.use(apiRouter);


app.listen(PORT, ()=>{
    logger.info(`Servidor escuchando el puerto: ${PORT}`);
})