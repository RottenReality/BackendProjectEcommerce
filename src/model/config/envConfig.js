import dotenv from "dotenv";
import path from 'path';
import { logger } from '../../loggers/logger.js';

const args = process.argv.splice(2);
const MODO = args[0] || 'development';

logger.info("modo:", MODO)

switch (MODO) {
    case 'development':
        dotenv.config({ path: 'development.env' });
        break;
    case 'production':
        dotenv.config({ path: 'production.env' });
        break;
    default:
        dotenv.config({ path: 'development.env' });
        break;
}

    const ADMIN_EMAIL= process.env.ADMIN_EMAIL;
    const ADMIN_PASS= process.env.ADMIN_PASS;
    const PORT= process.env.PORT || 8080;
    const DB= process.env.DB || "filesystem";
    const FB_LINK= process.env.FB_LINK;
    const MONGO_URL= process.env.MONGO_URL;
    const ACCOUNT_ID_TWILIO= process.env.ACCOUNT_ID_TWILIO;
    const TOKEN_TWILIO= process.env.TOKEN_TWILIO;
    const TWILIO_PHONE= process.env.TWILIO_PHONE;
    const ADMIN_PHONE= process.env.ADMIN_PHONE;
    const TWILIO_WP= process.env.TWILIO_WP;
    const ADMIN_WP= process.env.ADMIN_WP;


export {ADMIN_EMAIL, ADMIN_PASS, PORT, DB, FB_LINK, MONGO_URL, ACCOUNT_ID_TWILIO, TOKEN_TWILIO, TWILIO_PHONE, ADMIN_PHONE, TWILIO_WP, ADMIN_WP};