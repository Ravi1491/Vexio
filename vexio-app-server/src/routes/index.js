import express from "express";

import userRouter from "./user-routes";
import shopifyRouter from "./shopify-routes";
import sendEmail from "../utils/sendMail";
import { be_domain } from "../../config/default";
import storeRouter from "./store-routes";
import webhookRouter from "./webhooks";

const router = express.Router();

router.get("/", async (req, res) => {
  return res.send("Welcome to Vexio!!!");
});

router.get("/email/redirect", async (req, res) => {
  return res.send(req.query);
});

router.get("/send-test-email", async (req, res) => {
  const companyName = "Amazon";
  const customerEmail = "sakshamk@gluelabs.com";
  const customerName = "Saksham Khandelwal";
  const productName = "Leather Jacket";

  sendEmail(customerEmail, {
    templateName: "product_review",
    customerName,
    companyName,
    productName,
    redirectUrl: `${be_domain}/email/redirect?email=${customerEmail}&product=${productName}`,
  });

  return res.send("Email Sent");
});

router.use("/user", userRouter);
router.use("/shopify", shopifyRouter);
router.use("/stores", storeRouter);
router.use("/webhook", webhookRouter);

module.exports = router;
