import "reflect-metadata";
import express from "express";

import logger from "./utils/logger";
import { port } from "../config/default";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const PORT = port;

app.use(cors());
app.use(express.json());

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(cookieParser());

app.use("/", require("./routes/index"));

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
