import sendGridMail from "@sendgrid/mail";

import logger from "./logger.js";
import { sender_email, sendgrid_api_key } from "../../config/default";

const SENDER_EMAIL = sender_email;
const SENDGRID_API_KEY = sendgrid_api_key;

sendGridMail.setApiKey(SENDGRID_API_KEY);

const templates = {
  product_review: 'd-2af4d79afa464ed1b395d6a080c21426',
}

function getMessage(email, data) {
  return {
    to: email,
    from: SENDER_EMAIL,
    templateId: templates[data.templateName],
    dynamic_template_data: {
      customerName: data.customerName,
      productName: data.productName,
      companyName: data.companyName,
      senderEmail: 'vexio@gmail.com',
      redirectUrl: data.redirectUrl,
    }
  };
}

async function sendEmail(email, data) {
  try {
    await sendGridMail.send(getMessage(email, data));
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

export default sendEmail;
