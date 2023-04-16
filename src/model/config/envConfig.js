import * as dotenv from "dotenv";
dotenv.config(
    {
        path:".env.production"
    }
);

const envConfig={
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASS: process.env.ADMIN_PASS,
    MODE: process.env.MODE || "dev",
    PORT: process.env.PORT || 8080,
    DB: process.env.DB || "filesystem",
    FB_LINK: process.env.FB_LINK,
    MONGO_URL: process.env.MONGO_URL,
    ACCOUNT_ID_TWILIO: process.env.ACCOUNT_ID_TWILIO,
    TOKEN_TWILIO: process.env.TOKEN_TWILIO,
    TWILIO_PHONE: process.env.TWILIO_PHONE,
    ADMIN_PHONE: process.env.ADMIN_PHONE,
    TWILIO_WP: process.env.TWILIO_WP,
    ADMIN_WP: process.env.ADMIN_WP,

};


export {envConfig};