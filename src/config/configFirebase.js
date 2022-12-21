import admin from "firebase-admin";
import {readFileSync} from "fs";

const serviceAccount = JSON.parse(readFileSync("./firebaseKey.json"));
console.log(serviceAccount);

admin.initializeApp(
    {
        credential:admin.credential.cert(serviceAccount),
        databaseURL: "https://backendproyect-2c344.firebase.io"
    }
);

const db = admin.firestore()

export default db;
