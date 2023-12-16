import "reflect-metadata";
import express from "express";

import logger from "./utils/logger";
import { port } from "../config/default";
import userRouter from './routes/user-routes';

const app = express();
const PORT = port;

app.use(express.json());
app.use(userRouter);

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
