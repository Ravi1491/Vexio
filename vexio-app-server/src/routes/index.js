import express from "express";

import userRouter from "./user-routes";
import shopifyRouter from "./shopify-routes";
import storeRouter from "./store-routes";

const router = express.Router();

router.get("/", async (req, res) => {
  return res.send("Welcome to Vexio!!!");
});

router.use("/user", userRouter);
router.use("/shopify", shopifyRouter);
router.use("/stores", storeRouter);

module.exports = router;
