import * as cron from "node-cron";

export function cronJob() {
  cron.schedule("0 0 */1 * * *", () => {
    console.log("Running every hour...");
  });
}
