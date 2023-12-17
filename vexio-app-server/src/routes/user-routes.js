import express from "express";
import { validate } from "express-validation";

import { login, register, userDetails } from "../controllers/user";
import { userValidations } from "../validations/user";
import authenticateUser from "../auth/auth";

const router = express.Router();

router.get("/me", authenticateUser, userDetails);

router.post(
  "/signup",
  validate(userValidations.createUserValidator),
  register
);

router.post("/login", login);

module.exports = router;
