export const checkUserLogged = (req, res, next)=>{
    if(req.session.passport){
        next()
    } else {
        res.status(401).json({error:"Por favor inicia sesion"})
    }
}