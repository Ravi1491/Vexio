import express from "express";
import { getAllStores } from "../controllers/store";

const router = express.Router();

router.get("/getAllStores", getAllStores);

module.exports = router;
