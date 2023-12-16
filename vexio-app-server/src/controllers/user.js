import { compare, genSalt, hash } from "bcryptjs";

import logger from "../utils/logger";
import { createUser, findOneUser, generateToken } from "../services/user";
import { fe_domain } from "../../config/default";

export async function register(req, res) {
  try {
    const { email, password, username } = req.body;

    const user = await findOneUser({ email });

    if (user) {
      return res.status(400).send({ message: "User already exists" });
    }

    const isUsernameExist = await findOneUser({ username });

    if (isUsernameExist) {
      return res.status(400).send({ message: "Username already exists" });
    }

    const hashPassword = await hash(password, await genSalt());

    const payload = {
      ...req.body,
      password: hashPassword,
      isEmailVerified: true,
    };

    const newUser = await createUser(payload);

    logger.info("User Created Successfully!!!");

    const jwtToken = await generateToken({
      id: newUser.id,
      email: newUser.email,
    });

    res.cookie("user_access_token", jwtToken.token, {
      maxAge: 24 * 60 * 60 * 1000,
      domain: new URL(fe_domain).hostname,
      path: "/",
    });

    res.status(201).send(newUser);
  } catch (error) {
    logger.error(error);
    res.status(400).send(error);
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await findOneUser({ email });

    if (!user) {
      return res.status(400).send({
        message: "User does not exist",
      });
    }

    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).send({
        success: false,
        msg: "Wrong password",
      });
    }

    const jwtToken = await generateToken({
      id: user.id,
      email: user.email,
    });

    res.cookie("user_access_token", jwtToken.token, {
      maxAge: 24 * 60 * 60 * 1000,
      domain: new URL(fe_domain).hostname,
      path: "/",
    });

    const response = {
      user,
      accessToken: jwtToken.token,
      expiresIn: jwtToken.expiresIn,
    };

    res.status(200).send(response);
  } catch (error) {
    logger.error(error);
    res.status(400).send(error);
  }
}
