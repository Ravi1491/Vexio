import crypto from "crypto";
import axios from "axios";
import querystring from "querystring";
import { shopify_api_key, shopify_api_secret } from "../../config/default";
import logger from "../utils/logger";
import { registerWebhook } from "../services/shopify";
import { createStore, findOne, updateStore } from "../services/store";
import { bulkCreateStoreProducts } from "../services/store-products";

export async function installApp(req, res) {
  try {
    const apiKey = shopify_api_key;
    const scopes =
      "read_products,read_orders, read_analytics, read_orders, read_product_feeds, read_product_listings, read_products";

    const shop = req.query.shop || "xg-dev";
    const email = req.query.email || "ravi149185@gmail.com";

    if (!shop) {
      res.send("Shop parameter is missing");
      return;
    }

    const storeData = await findOne({ storeName: shop });

    if (!storeData) {
      await createStore({ shop, email });
    }

    if (storeData && storeData.isAppInstall) {
      return res.send("App already installed");
    }

    // const nonce = crypto.randomBytes(8).toString("hex");
    const redirectUri = `https://2ef8-2405-201-5011-217a-a887-d469-ad15-fa10.ngrok-free.app/shopify/oauth/callback`;
    const authUrl = `https://${shop}.myshopify.com/admin/oauth/authorize?client_id=${apiKey}&scope=${scopes}&redirect_uri=${redirectUri}`;

    res.redirect(authUrl);
  } catch (error) {
    logger.error(error);
  }
}

export async function oAuthCallback(req, res) {
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
    const storeData = await findOne({ storeName });

    if (!storeData) {
      return res.send("Store not found");
    }

    await updateStore(
      { accessToken: access_token, isAppInstall: true },
      { storeName }
    );

    await registerWebhook(shop, access_token);

    res.send("Successfully connected to Shopify!");
  } catch (error) {
    logger.error(error);
    res.send("Error while OAuth process");
  }
}

export async function fetchProducts(req, res) {
  try {
    const { shop } = req.query;

    if (!shop) {
      res.status(400).send("Missing shop parameter");
      return;
    }

    const storeData = await findOne({
      storeName: shop,
      isAppInstall: true,
    });

    if (!storeData) {
      res.status(404).send("Store not found or app not installed");
      return;
    }

    const accessToken = storeData.accessToken;

    // Fetch products from Shopify using the accessToken
    const shopifyApiUrl = `https://${shop}.myshopify.com/admin/api/2023-10/products.json`;

    const response = await axios.get(shopifyApiUrl, {
      headers: {
        "X-Shopify-Access-Token": accessToken,
      },
    });

    const products = response.data.products;

    let productsData = [];
    await Promise.all(
      products.map(async (product) => {
        const { title, id, handle } = product;
        const storeId = storeData.id;

        productsData.push({
          storeId,
          productTitle: title,
          productSlug: handle,
          productId: id,
          metadata: product,
        });
      })
    );

    await bulkCreateStoreProducts(productsData);

    res.json(products);
  } catch (error) {
    logger.error(error);
    res.status(500).send("Internal Server Error");
  }
}
