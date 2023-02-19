import express from "express";
import passport from "passport";
import { Strategy as LocalStrategy} from "passport-local";
import { UserModel } from "../config/models/user.js";
import bcrypt from "bcrypt";

const createHash = (password)=>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
};

const authRouter = express.Router();

passport.serializeUser((user, done)=>{
    return done(null, user.id)
});

passport.deserializeUser((id, done)=>{
    UserModel.findById(id,(error, userFound)=>{
        return done(error, userFound)
    })
});

passport.use("signupStrategy", new LocalStrategy(
    {
        passReqToCallback:true,
        usernameField:"email"
    },
    (req, username, password, done)=>{
        UserModel.findOne({email:username}, (error, user)=>{
            if(error) return done(null, false, {message:`Error buscando el usuario ${error}`});
            if(user) return done(null, false, {message:"El usuario ya está registrado"});

            const newUser = {
                email:username,
                password:createHash(password),
                nombre:req.body.nombre,
                direccion:req.body.direccion,
                edad:req.body.edad,
                celular:req.body.celular,
                avatar:req.body.avatar,
            }

            UserModel.create(newUser, (error, userCreated)=>{
                if(error) return done(null, false, {message:`Error registrando al usuario ${error}`})
                return done(null, userCreated, {message:"Usuario registrado correctamente"})
            })
        })
    }
));

authRouter.post("/signup", passport.authenticate("signupStrategy", {
    failureRedirect:"api/auth/signup",
    failureMessage:true
}), (req, res)=>{
    res.send("usuario registrado y autenticado")
});

authRouter.get("/signupError",(req, res)=>{
    const errorMessage = req.session.messages[0]||"";
    req.session.messages = [];
    res.json({error:errorMessage})
});

authRouter.post("/logout",(req, res)=>{
    req.logOut(err=>{
        if(err) return res.status(400).json({error:"No se pudo cerrar la sesión"})
        res.status(200).json({message:"session finalizada"})
    });
});

authRouter.get("/home",(req, res)=>{
    res.send("prueba rutas autenticación")
});

export {authRouter};