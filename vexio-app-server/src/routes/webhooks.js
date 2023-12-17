import express from "express";
import { orderFullfilledWebhook } from "../controllers/webhook";

const router = express.Router();

router.post("/order-fulfilled", orderFullfilledWebhook);

module.exports = router;
