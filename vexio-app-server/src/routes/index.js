import express from "express";

import userRouter from "./user-routes";
import shopifyRouter from "./shopify-routes";
import storeRouter from "./store-routes";
import emailRouter from "./email-routes";
import webhookRouter from "./webhooks";
import reviewRouter from "./review-routes";

const router = express.Router();

router.get("/", async (req, res) => {
  return res.send("Welcome to Vexio!!!");
});

router.use("/user", userRouter);
router.use("/email", emailRouter);
router.use("/shopify", shopifyRouter);
router.use("/stores", storeRouter);
router.use("/reviews", reviewRouter);
router.use("/webhook", webhookRouter);

module.exports = router;
