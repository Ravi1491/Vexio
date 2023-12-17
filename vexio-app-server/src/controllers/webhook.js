import { handleOrderFulfilled } from "../services/webhook";
import axios from "axios";
import { be_domain } from "../../config/default";
import logger from "../utils/logger";

export async function registerWebhook(shop, accessToken) {
  const webhookEndpoint = `${be_domain}/webhook/order-fulfilled`;

  const webhookPayload = {
    webhook: {
      topic: "orders/fulfilled",
      address: webhookEndpoint,
      format: "json",
    },
  };

  const apiUrl = `https://${shop}/admin/api/2023-10/webhooks.json`;

  try {
    const response = await axios.post(apiUrl, webhookPayload, {
      headers: {
        "X-Shopify-Access-Token": accessToken,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 201) {
      console.log("Webhook registered successfully", response);
    } else {
      console.error("Failed to register webhook:", response.data);
    }
  } catch (error) {
    console.error("Error registering webhook:", error.message);
  }
}

export async function orderFullfilledWebhook(req, res) {
  try {
    // Verify the request is from Shopify
    // Implement request verification logic here
    // Parse the incoming webhook payload
    const webhookData = req.body;
    console.log("WEBHOOK RECEIVED", req.route.path);

    // Handle the specific event based on the 'topic' in the payload
    switch (req.route.path) {
      case "/order-fulfilled":
        handleOrderFulfilled(webhookData);
        break;
      // Add more cases for other webhook topics if needed
    }

    // Respond to the webhook request
    res.status(200).send("Webhook received successfully");
  } catch (error) {
    logger.error(error);
    res.status(500).send("Internal Server Error");
  }
}
