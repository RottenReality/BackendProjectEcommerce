import dotenv from "dotenv";
dotenv.config();

const envConfig={
    mail: process.env.mail,
    pass: process.env.pass
};


export {envConfig};