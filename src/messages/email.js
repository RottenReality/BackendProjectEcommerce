import nodemailer from "nodemailer";
import { ADMIN_EMAIL, ADMIN_PASS } from "../model/config/envConfig.js";

const email = ADMIN_EMAIL;
const pass = ADMIN_PASS;

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