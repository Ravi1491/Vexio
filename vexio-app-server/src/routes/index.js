import express from "express";

import userRouter from './user-routes';
import shopifyRouter from './shopify-routes';

const router = express.Router();

router.get("/", async (req, res) => {
  return res.send("Welcome to Vexio!!!");
});

router.use("/user", userRouter);
router.use("/shopify", shopifyRouter);

module.exports = router;
