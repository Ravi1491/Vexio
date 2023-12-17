import express from "express";
import { acceptEmailReviews, getReviewRequest } from "../controllers/review";

const router = express.Router();

router.post("/accept-email-reviews", acceptEmailReviews);

router.get('/get-review-requests', getReviewRequest);
module.exports = router;
