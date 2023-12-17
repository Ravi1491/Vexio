import logger from "../utils/logger";
import { createRequest, findOneRequest } from "./review-request";
import { findOne } from "./store-products";
import model from "../../models";

const webhookModel = model.webhook;

export const findOneWebhook = async (payload) => {
  const webhook = await webhookModel.findOne({
    where: payload,
  });

  return webhook;
};

export const findAllWebhooks = async (payload) => {
  const webhooks = await webhookModel.findAll({
    where: payload,
  });

  return webhooks;
};


export async function handleOrderFulfilled(webhookData) {
  try {
    const fulfilledData = {
      customerName: `${webhookData.customer.first_name} ${webhookData.customer.last_name}`,
      customerEmail: webhookData.customer.email,
      orderNumber: webhookData.order_number.toString(),
      productId: webhookData.line_items[0].product_id.toString(),
      productName: webhookData.line_items[0].title,
    };

    const storeProduct = await findOne({ productId: fulfilledData.productId });

    const doesReviewRequestExist = await findOneRequest({
      productId: storeProduct.productId,
      customerEmail: fulfilledData.customerEmail,
    });

    let createReviewRequest;
    if (!doesReviewRequestExist) {
      createReviewRequest = await createRequest({
        productId: storeProduct.productId,
        productSlug: storeProduct.productSlug,
        customerEmail: fulfilledData.customerEmail,
      });
    }

    fulfilledData["reviewRequestId"] = doesReviewRequestExist
      ? doesReviewRequestExist.id
      : createReviewRequest.id;

    const doesWebhookExist = await findOneWebhook({
      orderNumber: fulfilledData.orderNumber,
      productId: fulfilledData.productId,
      customerEmail: fulfilledData.customerEmail,
      reviewRequestId: fulfilledData.reviewRequestId,
    });

    if (!doesWebhookExist) {
      await createWebhook(fulfilledData);
    }

    return;
  } catch (error) {
    logger.error(error);
  }
}

export async function createWebhook(payload) {
  try {
    console.log("WEBHOOK DATA", payload);
    const webhookData = await webhookModel.create(payload);

    logger.info("Webhook data saved successfully", webhookData);
    return;
  } catch (error) {
    logger.error("Error while saving webhook", error);
  }
}
