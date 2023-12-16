// models/store.js

const { DataTypes } = require("sequelize");
const sequelize = require("../database"); // Assuming you have a Sequelize instance

const Store = sequelize.define("Store", {
  storeName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "store_name",
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accessToken: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "access_token",
  },
  isAppInstall: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    field: "is_app_install",
  },
});

module.exports = Store;
