import twilio from "twilio";
import { ACCOUNT_ID_TWILIO, TOKEN_TWILIO, TWILIO_PHONE, ADMIN_PHONE, TWILIO_WP, ADMIN_WP} from "../model/config/envConfig.js";


const accountId = ACCOUNT_ID_TWILIO;
const tokenTwilio = TOKEN_TWILIO;

const twilioPhone = TWILIO_PHONE;
const adminPhone = ADMIN_PHONE;

const twilioWp = TWILIO_WP;
const adminWp = ADMIN_WP;

const twilioClient = twilio(accountId, tokenTwilio);

export {twilioClient, twilioPhone, adminPhone, twilioWp, adminWp}