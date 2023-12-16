import express from "express";
import crypto from "crypto";
import axios from "axios";
import querystring from "querystring";

import logger from "../utils/logger";
import Store from "../../models/store";

require("dotenv").config();

const router = express.Router();

router.get("/install-app", async (req, res) => {
  try {
    const apiKey = process.env.SHOPIFY_API_KEY;
    const scopes =
      "read_products,read_orders, read_analytics, read_orders, read_product_feeds, read_product_listings, read_products";

    const shop = req.query.shop || "xg-dev";
    const email = req.query.email;

    if (!shop) {
      res.send("Shop parameter is missing");
      return;
    }

    const nonce = crypto.randomBytes(8).toString("hex");
    const redirectUri = `https://f868-112-196-47-10.ngrok-free.app/oauth/callback`;

    const authUrl = `https://${shop}.myshopify.com/admin/oauth/authorize?client_id=${apiKey}&scope=${scopes}&redirect_uri=${redirectUri}&state=${nonce}`;

    await Store.create({
      store_name: shop,
      email: email || "ravi149185@gmail.com",
      access_token: "",
      isAppInstall: false,
    });

    res.redirect(authUrl);
  } catch (error) {
    logger.error(error);
  }
});

router.get("/oauth/callback", async (req, res) => {
  const apiKey = process.env.SHOPIFY_API_KEY;
  const apiSecret = process.env.SHOPIFY_API_SECRET;
  const { code, shop } = req.query;

  if (!code || !shop) {
    res.send("Missing code or shop parameter");
    return;
  }

  const accessTokenUrl = `https://${shop}/admin/oauth/access_token`;
  const accessParams = {
    client_id: apiKey,
    client_secret: apiSecret,
    code,
  };

  try {
    const response = await axios.post(
      accessTokenUrl,
      querystring.stringify(accessParams),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token } = response.data;
    await Store.update(
      { access_token, isAppInstall: true },
      { where: { store_name: shop } }
    );

    res.send("Successfully connected to Shopify!");
  } catch (error) {
    logger.error(error);
    res.send("Error while OAuth process");
  }
});

module.exports = router;
