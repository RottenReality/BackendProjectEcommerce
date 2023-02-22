import express from "express";
import passport from "passport";
import { Strategy as LocalStrategy} from "passport-local";
import { UserModel } from "../config/models/user.js";

const createHash = (password)=>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
};

const comparePassword = (password)=> {
    return bcrypt.compareSync(password, this.password);
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
    res.render("signup")
});

authRouter.post("/signup", passport.authenticate("signupStrategy", {
    failureRedirect:"api/auth/signupError",
    failureMessage:true
}), (req, res)=>{
    res.send("usuario registrado y autenticado")
});

authRouter.get("/signupError",(req, res)=>{
    const errorMessage = req.session.messages[0]||"";
    req.session.messages = [];
    res.json({error:errorMessage})
});

authRouter.get("/signin",(req, res)=>{
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

authRouter.get("/home",(req, res)=>{
    res.send("prueba rutas autenticación")
});

authRouter.get("/test",(req, res)=>{
    res.render("signup")
});

authRouter.get("/profile",(req, res)=>{
    res.render("profile")
});

export {authRouter};