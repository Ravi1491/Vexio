import express from "express";

import {
  fetchProducts,
  installApp,
  oAuthCallback,
} from "../controllers/shopify";

const router = express.Router();

router.get("/install", installApp);

router.get("/oauth/callback", oAuthCallback);

router.get("/fetch-products", fetchProducts);

module.exports = router;
