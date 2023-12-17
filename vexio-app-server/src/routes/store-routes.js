import express from "express";
import { getAllStores, getAllProducts } from "../controllers/store";

const router = express.Router();

router.get("/getAllStores", getAllStores);

router.get("/all-products", getAllProducts);

module.exports = router;
