import express from "express";

import { login, register } from "../controllers/user";

const router = express.Router();

router.get("/", async (req, res) => {
  return res.send("Welcome to Vexio!!!");
});

router.post("/signup", register);

router.post("/login", login);

module.exports = router;
