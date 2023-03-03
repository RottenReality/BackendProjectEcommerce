import nodemailer from "nodemailer";
import { envConfig } from "../config/envConfig.js";

const email = 'felton61@ethereal.email';
const pass = 'Bncs3TtdtZc1W9yuQ8'

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