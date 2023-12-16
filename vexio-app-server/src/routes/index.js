import express from "express";

import userRouter from "./user-routes";
import shopifyRouter from "./shopify-routes";
import sendEmail from "../utils/sendMail";
import { node_env } from "../../config/default";

const router = express.Router();

router.get("/", async (req, res) => {
  return res.send("Welcome to Vexio!!!");
});

router.get("/redirect", async (req, res) => {
  return res.send(req.query);
})

router.get("/send-test-email", async (req, res) => {
  const companyName = "Amazon";
  const customerEmail = "sakshamk@gluelabs.com";
  const customerName = "Saksham Khandelwal";
  const productName = "Leather Jacket";

  sendEmail(customerEmail, {
    templateName: 'product_review',
    customerName,
    companyName,
    productName,
    redirectUrl:
      node_env === "development"
        ? `http://localhost:4000/redirect?email=${customerEmail}&product=${productName}`
        : `https://vexio-production.up.railway.app/redirect?email=${customerEmail}&product=${productName}`,
  });

  return res.send("Email Sent");
});

router.use("/user", userRouter);
router.use("/shopify", shopifyRouter);

module.exports = router;
