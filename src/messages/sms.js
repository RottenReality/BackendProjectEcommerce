import twilio from "twilio";
import { envConfig } from "../model/config/envConfig.js";

const accountId = envConfig.ACCOUNT_ID_TWILIOM;
const tokenTwilio = envConfig.TOKEN_TWILIO;

const twilioPhone = envConfig.TWILIO_PHONE;
const adminPhone = envConfig.ADMIN_PHONE;

const twilioWp = envConfig.TWILIO_WP;
const adminWp = envConfig.ADMIN_WP;

const twilioClient = twilio(accountId, tokenTwilio);

export {twilioClient, twilioPhone, adminPhone, twilioWp, adminWp}