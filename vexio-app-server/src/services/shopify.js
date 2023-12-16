import axios from "axios";

// Function to register a webhook in Shopify
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
