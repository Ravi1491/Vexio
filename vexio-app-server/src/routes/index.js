const express = require("express");
const router = express.Router();

router.use("/user", require("./user-routes"));
router.use("/shopify", require("./shopify-route"));

module.exports = router;
