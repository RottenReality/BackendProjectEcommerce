import express from "express";
import passport from "passport";
import mongoose from "mongoose";
import MongoStore from 'connect-mongo';
import { url } from '../config/configMongo.js'
import session from "express-session";
import { Strategy as LocalStrategy} from "passport-local";
import { UserModel } from "../config/models/user.js";
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

const createHash = (password)=>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
};

const comparePassword = (password)=> {
    return bcrypt.compareSync(password, this.password);
};

const authRouter = express.Router();


authRouter.use(session({
    store:MongoStore.create({
        mongoUrl:url
    }),
    secret:"claveSecreta",
    resave:false,
    saveUninitialized:false
}));

authRouter.use(passport.initialize());
authRouter.use(passport.session());


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

            const newUser = new UserModel() 
            
                newUser.email = username;
                newUser.password = newUser.encryptPassword(password);
                newUser.nombre = req.body.nombre;
                newUser.direccion = req.body.direccion;
                newUser.edad = req.body.edad;
                newUser.celular = req.body.celular;
                newUser.avatar = req.body.avatar;
            

            UserModel.create(newUser, (error, userCreated)=>{
                if(error) return done(null, false, {message:`Error registrando al usuario ${error}`})
                return done(null, userCreated, {message:"Usuario registrado correctamente"})
            })
        })
    }
));


passport.use('signinStrategy', new LocalStrategy(
    {
        passReqToCallback:true,
        usernameField:"email"
    },
    (req, username, password, done)=>{
        UserModel.findOne({email:username}, (error, user)=>{
            if(!user) return done(null, false, {message:`No se encuentera el usuario ${error}`});
            if(!user.comparePassword(password)) return done(null, false, {message:"Contraseña incorrecta"});
            done(null, user);

            
        })
    }
))

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
    failureRedirect:"/api/auth/signin",
    failureMessage:true,
}));

authRouter.post("/logout",(req, res)=>{
    req.logOut(err=>{
        if(err) return res.status(400).json({error:"No se pudo cerrar la sesión"})
        res.status(200).json({message:"session finalizada"})
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