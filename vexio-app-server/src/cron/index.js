import * as cron from "node-cron";
import logger from "../utils/logger";

export function cronJob() {
  cron.schedule("0 0 */1 * * *", () => {
    logger.log("Running send email review request cron...");
  });
}
