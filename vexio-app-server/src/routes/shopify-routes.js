import express from "express";

import {
  fetchProducts,
  installApp,
  oAuthCallback,
  uninstallApp,
} from "../controllers/shopify";

const router = express.Router();

router.get("/install", installApp);

router.get("/oauth/callback", oAuthCallback);

router.get("/fetch-products", fetchProducts);
router.post("/uninstall", uninstallApp);

module.exports = router;
