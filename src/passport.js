import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { UserModel } from "./config/models/user.js";

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

export default passport;
