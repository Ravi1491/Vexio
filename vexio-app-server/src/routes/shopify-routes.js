import express from "express";
import crypto from "crypto";
import axios from "axios";
import querystring from "querystring";
import model from "../../models";
import { shopify_api_key, shopify_api_secret } from "../../config/default";

import logger from "../utils/logger";

require("dotenv").config();

const router = express.Router();
const store = model.store;

router.get("/install-app", async (req, res) => {
  try {
    const apiKey = shopify_api_key;
    const scopes =
      "read_products,read_orders, read_analytics, read_orders, read_product_feeds, read_product_listings, read_products";

    const shop = req.query.shop || "xg-dev";
    const email = req.query.email;

    if (!shop) {
      res.send("Shop parameter is missing");
      return;
    }

    const storeData = await store.findOne({
      where: {
        storeName: shop,
      },
    });

    if (!storeData) {
      await store.create({
        storeName: shop,
        email: email || "ravi149185@gmail.com",
        accessToken: "",
        isAppInstall: true,
      });
    }

    if (storeData && storeData.isAppInstall) {
      return res.send("App already installed");
    }

    const nonce = crypto.randomBytes(8).toString("hex");
    const redirectUri = `https://f8a0-2405-201-5011-217a-a887-d469-ad15-fa10.ngrok-free.app/shopify/oauth/callback`;
    const authUrl = `https://${shop}.myshopify.com/admin/oauth/authorize?client_id=${apiKey}&scope=${scopes}&redirect_uri=${redirectUri}&state=${nonce}`;

    res.redirect(authUrl);
  } catch (error) {
    logger.error(error);
  }
});

router.get("/oauth/callback", async (req, res) => {
  const apiKey = shopify_api_key;
  const apiSecret = shopify_api_secret;
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
    const storeName = shop.split(".")[0];
    const storeData = await store.findOne({
      where: {
        storeName,
      },
    });

    if (!storeData) {
      return res.send("Store not found");
    }

    await store.update(
      { accessToken: access_token, isAppInstall: true },
      { where: { storeName: storeName } }
    );

    res.send("Successfully connected to Shopify!");
  } catch (error) {
    logger.error(error);
    res.send("Error while OAuth process");
  }
});

module.exports = router;
