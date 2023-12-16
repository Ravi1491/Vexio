import express from "express";

import userRouter from './user-routes';
import shopifyRouter from './shopify-routes';

const router = express.Router();

router.use("/user", userRouter);
router.use("/shopify", shopifyRouter);

module.exports = router;
