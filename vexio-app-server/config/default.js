require("dotenv").config();

const {
  PORT,
  DB_USERNAME,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_HOST,
  JWT_SECRET,
  SHOPIFY_APP_API_KEY,
  SHOPIFY_APP_API_SECRET,
} = process.env;

module.exports = {
  port: PORT || 4000,
  username: DB_USERNAME,
  database: DB_NAME,
  password: DB_PASSWORD,
  db_port: DB_PORT,
  host: DB_HOST,
  jwt_secret: JWT_SECRET || "vexio-secret",
  expires_in: "24h",
  issuer: "vexio",
  shopify_api_key: SHOPIFY_APP_API_KEY,
  shopify_api_secret: SHOPIFY_APP_API_SECRET,
};
