import express from "express";
import { acceptEmailReviews } from "../controllers/review";

const router = express.Router();

router.post("/accept-email-reviews", acceptEmailReviews);
module.exports = router;
