import nodemailer from "nodemailer";
import { envConfig } from "../model/config/envConfig.js";

const email = envConfig.EMAIL;
const pass = envConfig.PASS;

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: email,
        pass: pass
    },
    secure:false,
    tls:{
        rejectUnauthorized:false
    }
});

export {transporter, email, pass}