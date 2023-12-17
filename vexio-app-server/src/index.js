import "reflect-metadata";
import express from "express";

import logger from "./utils/logger";
import { port } from "../config/default";
import cors from "cors";
import cookieParser from "cookie-parser";
// import cronJob from "./cron";

const bodyParser = require("body-parser");

const app = express();
const PORT = port;

app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/", require("./routes/index"));

// cronJob();

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
