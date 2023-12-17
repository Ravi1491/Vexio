import { fe_domain } from "../../config/default";
import express from "express";
import sendEmail from "../utils/sendMail";
import logger from "../utils/logger";
import { findOne } from "../services/store-products";
import { findOneStore } from "../services/store";
import { createRequest } from "../services/review-request";
import { ReviewStatus } from "../utils/constants";

const router = express.Router();

router.post("/send-email", async (req, res) => {
  try {
    const { customerEmail, customerName, productSlug } = req.body;

    const product = await findOne({ productSlug });

    if (!product) {
      return res.status(400).send("Product not found");
    }

    const store = await findOneStore({ id: product.storeId });

    if (!store) {
      return res.status(400).send("Store not found");
    }

    const newRequest = await createRequest({
      productSlug,
      customerEmail,
      productId: product.id,
      status: ReviewStatus.SENT,
    });

    sendEmail(customerEmail, {
      templateName: "product_review",
      customerName,
      companyName: store.storeName,
      productName: product.productTitle,
      productImage: product.metadata?.image.src,
      redirectUrl: `${fe_domain}/email/redirect?email=${customerEmail}&product=${productSlug}&request_id=${newRequest.id}`,
    });

    return res.send("Email Sent Successfully");
  } catch (error) {
    logger.error(error);
    res.status(400).send(error);
  }
});

module.exports = router;
