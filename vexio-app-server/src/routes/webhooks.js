import express from "express";
import logger from "../utils/logger";
const router = express.Router();

router.post("/order-fulfilled", async (req, res) => {
  try {
    // Verify the request is from Shopify
    // Implement request verification logic here
    console.log("WEBHOOK RECEIVED", req.body);
    // Parse the incoming webhook payload
    const webhookData = req.body;

    // Handle the specific event based on the 'topic' in the payload
    switch (webhookData.topic) {
      case "orders/fulfilled":
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
});

function handleOrderFulfilled(webhookData) {
  const { id, status, line_items } = webhookData;
  // Add your logic to process the order fulfillment event
  // For example, update your database, send notifications, etc.
  console.log(`Order ${id} has been fulfilled with status: ${status}`);
  console.log("Line items:", line_items);
}

module.exports = router;
