import express from "express";
import passport from "passport";
import mongoose from "mongoose";
import { envConfig } from "../config/envConfig.js";
import { url } from '../config/configMongo.js'
import { ContenedorDaoUsers, ContenedorDaoCarts} from '../daos/index.js';
import {checkUserLogged} from '../middlewares/authMidd.js'
import { transporter, email, pass } from "../messages/email.js";
import { logger } from '../loggers/logger.js';



mongoose.connect(url,{
    useNewUrlParsers:true,
    useUnifiedTopology: true
},(error)=>{
    if(error) logger.error("Conexión fallida");
    logger.info("Base de datos conectada correctamente")
});

const users = ContenedorDaoUsers;
const carts = ContenedorDaoCarts;

const authRouter = express.Router();


authRouter.get("/signup",(req, res)=>{
    if(req.session.passport) res.redirect("profile")
    res.render("signup")
});

authRouter.post("/signup", passport.authenticate("signupStrategy", {
    failureRedirect:"api/auth/signupError",
    failureMessage:true
}), async (req, res)=>{
    const usuario = req.session.passport.user;
    const infUser = await users.getById(usuario)
    await carts.createCart(usuario)
    try {
        await transporter.sendMail({
            from:"server app Node",
            to:email,
            subject:"Nuevo registro",
            text: `
                Email: ${infUser.email}
                password: ${infUser.password}
                nombre: ${infUser.nombre}
                direccion: ${infUser.direccion}
                edad: ${infUser.edad}
                celular: ${infUser.celular}
                avatar: ${infUser.avatar}
            `
        })
    } catch (error) {
        logger.error(`hubo un error ${error}`)
    }
    res.redirect("profile")
});

authRouter.get("/signupError",(req, res)=>{
    const errorMessage = req.session.messages[0]||"";
    req.session.messages = [];
    res.json({error:errorMessage})
});

authRouter.get("/signin",(req, res)=>{
    if(req.session.passport) res.redirect("profile")
    res.render("signin")
});

authRouter.post("/signin", passport.authenticate("signinStrategy", {
    successRedirect:"/api/auth/profile",
    failureRedirect:"/api/auth/signin"
}));

authRouter.get('/logout', (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ error: 'No se pudo cerrar la sesión' });
      }
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ error: 'No se pudo cerrar la sesión' });
        }
        res.clearCookie('connect.sid');
        res.redirect('/api/auth/signin');
      });
    });
  });
  

authRouter.get("/test",(req, res)=>{
    res.render("signup")
});

authRouter.get("/profile", checkUserLogged, async (req, res)=>{

    const info = await users.getById(req.session.passport.user);
    res.render("profile", {info: info.toJSON()})
    

});

export {authRouter};