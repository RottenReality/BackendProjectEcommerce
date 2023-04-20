import fs from "fs"
class Contenedor{

    constructor (filename){
        this.filename = filename
    };

    async save(objeto){
        try{
            if(fs.existsSync(this.filename)){
                const users = await this.getAll();
                if(users.length > 0){
                    const lastId = parseInt(users[users.length-1].id) + 1;
                    objeto.id = lastId;
                    users.push(objeto);
                    fs.promises.writeFile(this.filename, JSON.stringify(users, null, 2))
                    return objeto
                } else{
                    objeto.id = 1
                    fs.promises.writeFile(this.filename, JSON.stringify([objeto], null, 2))
                    return objeto
                }
            } else {
                objeto.id = 1
                fs.promises.writeFile(this.filename, JSON.stringify([objeto], null, 2))
                return objeto
            }
        } catch (error) {
            return "error, producto no se pudo guardar."
        }

    }

    async getAll(){
        try {
            const contenido = await fs.promises.readFile(this.filename, "utf8");
            if(contenido.length > 0){
                const users = JSON.parse(contenido);
                return users;
                
            } else{
                return [];
            }
            
        } catch (error) {
            return "error en lectura de usuarios"
        }
        
    }

    async getById(idUser){
        try {
            const lista = await this.getAll();
            const user = lista.find((elemento)=>elemento.id == idUser);
            return user;
        } catch (error) {
            return "no se encuentra usuario"
        }
    }

    
    async deleteByiD(id){
        try{
            const productos = await this.getAll();
            const nProds = productos.filter(elemento=>elemento.id != id)
            fs.promises.writeFile(this.filename, JSON.stringify(nProds, null, 2))
        } catch (error){
            return {"error":"no se puede eliminar"}
        }
    }

    async deleteAll(){
        fs.promises.writeFile(this.filename,"")
        console.log("datos eliminados")
    }
    
}



export{Contenedor};