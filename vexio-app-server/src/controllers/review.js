import { createReviewReceive, findOneReceived } from "../services/review";
import logger from "../utils/logger";

export async function acceptEmailReviews(req, res) {
  try {
    const { rating, feedback, reviewRequestId } = req.body;

    const reviews = await findOneReceived({ reviewRequestId });

    let review = null;
    if (!reviews) {
      review = await createReviewReceive({ rating, feedback, reviewRequestId });
    }

    res.status(200).send({ review });
  } catch (error) {
    logger.error(error);
    res.status(400).send(error);
  }
}
