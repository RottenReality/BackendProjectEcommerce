import admin from "firebase-admin";
import {readFileSync} from "fs";

const serviceAccount = JSON.parse(readFileSync("./src/config/firebaseKey.json"));
console.log(serviceAccount);

try {
    admin.initializeApp(
        {
            credential:admin.credential.cert(serviceAccount),
            databaseURL: "https://backendproyect-2c344.firebase.io"
        }
    );

    console.log("firebase conectada")
    
} catch (error) {
    console.log(error)
}


const db = admin.firestore()

export {db};
