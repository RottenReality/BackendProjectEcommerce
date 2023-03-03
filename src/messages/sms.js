import twilio from "twilio";

const accountId = "AC9479f5658a0b447561c8e50e146082f5";
const tokenTwilio = "a4aeff81bc4c82458ebff18f02d3379f";

const twilioPhone = "+12708196783";
const adminPhone = "+573052327945";

const twilioWp = "whatsapp:+14155238886";
const adminWp = "whatsapp:+573052327945";

const twilioClient = twilio(accountId, tokenTwilio);

export {twilioClient, twilioPhone, adminPhone, twilioWp, adminWp}