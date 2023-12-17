import * as cron from "node-cron";
import logger from "../utils/logger";
import { findOneWebhook } from "../services/webhook";
import { findAllRequests, updateRequest } from "../services/review-request";
import { ReviewStatus } from "../utils/constants";
import sendEmail from "../utils/sendMail";
import { fe_domain } from "../../config/default";
import { findOne } from "../services/store-products";
import { findOneStore } from "../services/store";

export default () => {
  cron.schedule("0 0 */1 * * *", async () => {
    logger.info("Starting the cron job to send the email for review request");

    try {
      const reviewRequests = await findAllRequests({
        status: ReviewStatus.PENDING,
      });

      await Promise.all(
        reviewRequests.map(async (request) => {
          const webhook = await findOneWebhook({ reviewRequestId: request.id });

          if (webhook) {
            const product = await findOne({ productId: webhook.productId });

            if (product) {
              const store = await findOneStore({ id: product.storeId });

              if (store) {
                sendEmail(webhook.customerEmail, {
                  templateName: "product_review",
                  customerName: webhook.customerName,
                  companyName: store.storeName,
                  productName: webhook.productName,
                  productImage: product.metadata?.image.src,
                  redirectUrl: `${fe_domain}/email/redirect?email=${webhook.customerEmail}&product=${product.productSlug}&request_id=${request.id}`,
                });

                await updateRequest(
                  { status: ReviewStatus.SENT },
                  { id: request.id }
                );
              }
            }
          }
        })
      );
    } catch (error) {
      logger.error(
        `Failed send email review request cron job, error: ${error}`
      );
    }
  });
};
