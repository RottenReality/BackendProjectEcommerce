import express from "express";
import passport from "passport";
import mongoose from "mongoose";
import { url } from '../config/configMongo.js'
import { ContenedorDaoUsers } from '../daos/index.js';
import {checkUserLogged} from '../middlewares/authMidd.js'


mongoose.connect(url,{
    useNewUrlParsers:true,
    useUnifiedTopology: true
},(error)=>{
    if(error) console.log("Conexión fallida");
    console.log("Base de datos conectada correctamente")
});

const users = ContenedorDaoUsers;

const authRouter = express.Router();


authRouter.get("/signup",(req, res)=>{
    if(req.session.passport) res.redirect("profile")
    res.render("signup")
});

authRouter.post("/signup", passport.authenticate("signupStrategy", {
    failureRedirect:"api/auth/signupError",
    failureMessage:true
}), (req, res)=>{
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

authRouter.post("/logout",(req, res)=>{
    req.logOut(err=>{
        if(err) return res.status(400).json({error:"No se pudo cerrar la sesión"})
        res.status(200).json({message:"session finalizada"})
    });
    res.redirect("/signin");
});
  

authRouter.get("/test",(req, res)=>{
    res.render("signup")
});

authRouter.get("/profile", checkUserLogged, async (req, res)=>{

    const info = await users.getById(req.session.passport.user);
    res.render("profile", {info: info.toJSON()})
    

});

export {authRouter};