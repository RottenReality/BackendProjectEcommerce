import admin from "firebase-admin";
import {readFileSync} from "fs";
import { FB_LINK } from "./envConfig.js";

const serviceAccount = JSON.parse(readFileSync("./src/config/firebaseKey.json"));
console.log(serviceAccount);

try {
    admin.initializeApp(
        {
            credential:admin.credential.cert(serviceAccount),
            databaseURL: FB_LINK
        }
    );

    console.log("firebase conectada")
    
} catch (error) {
    console.log(error)
}


const db = admin.firestore()

export {db};
