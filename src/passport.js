import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { UserModel } from "./model/dbModels/user.model.js";
import {DB} from "./model/config/envConfig.js"
import bcrypt from "bcrypt";
import fs from 'fs'

// Agrega la siguiente línea para obtener el valor de la variable de entorno `DB`
const dbType = DB;

passport.serializeUser((user, done)=>{
    return done(null, user.id)
});

passport.deserializeUser((id, done)=>{
    // Agrega un condicional para utilizar MongoDB o el sistema de archivos
    if (dbType === 'filesystem') {
        // Cargar el archivo de usuarios y buscar al usuario por id
        const users = JSON.parse(fs.readFileSync('src/files/users.txt', 'utf8'));
        const userFound = users.find(u => u.id === id);
        return done(null, userFound);
    } else {
        // Utilizar MongoDB para buscar al usuario por id
        UserModel.findById(id,(error, userFound)=>{
            return done(error, userFound)
        });
    }
});

function encryptPassword(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
};
  

passport.use("signupStrategy", new LocalStrategy(
    {
        passReqToCallback:true,
        usernameField:"email"
    },
    (req, username, password, done)=>{
        // Agrega un condicional para utilizar MongoDB o el sistema de archivos
        if (dbType === 'filesystem') {
            // Cargar el archivo de usuarios y buscar al usuario por email
            const users = JSON.parse(fs.readFileSync('src/files/users.txt', 'utf8'));
            const user = users.find(u => u.email === username);
            if(user) return done(null, false, {message:"El usuario ya está registrado"});
            
            const newUser = { 
                id: users.length + 1,
                email: username,
                password: encryptPassword(password),
                nombre: req.body.nombre,
                direccion: req.body.direccion,
                edad: req.body.edad,
                celular: req.body.celular,
                avatar: req.body.avatar
            };
            users.push(newUser);
            fs.writeFileSync('src/files/users.txt', JSON.stringify(users, null, 2));
            return done(null, newUser, {message:"Usuario registrado correctamente"})
        } else {
            // Utilizar MongoDB para buscar al usuario por email
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
    }
));

passport.use('signinStrategy', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    (email, password, done) => {
        // Agrega un condicional para utilizar MongoDB o el sistema de archivos
        if (dbType === 'filesystem') {
            // Cargar el archivo de usuarios y buscar al usuario por email
            const users = JSON.parse(fs.readFileSync('src/files/users.txt', 'utf8'));
            const userFound = users.find(u => u.email === email);
            if (!userFound) {
                return done(null, false, { message: 'El usuario no existe' });
            }
            if (!bcrypt.compareSync(password, userFound.password)) {
                return done(null, false, { message: 'Contraseña incorrecta' });
            }
            return done(null, userFound, { message: 'Inicio de sesión exitoso' });
        } else {
            // Utilizar MongoDB para buscar al usuario por email
            UserModel.findOne({email:email}, (error, user)=>{
                if(!user) return done(null, false, {message:`No se encuentera el usuario ${error}`});
                if(!user.comparePassword(password)) return done(null, false, {message:"Contraseña incorrecta"});
                done(null, user);
    
                
            })
        }
    }
));

export default passport;