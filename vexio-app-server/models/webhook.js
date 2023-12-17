"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class webhook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  webhook.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      customerName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "customer_name",
      },
      customerEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "customer_email",
      },
      orderNumber: {
        type: DataTypes.STRING,
        field: "order_number",
      },
      productName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "product_name",
      },
      productId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "product_id",
      },
      reviewRequestId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "review_request_id",
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: "created_at",
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: "updated_at",
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE,
        field: "deleted_at",
      },
    },
    {
      paranoid: true,
      timestamps: true,
      deletedAt: "deleted_at",
      sequelize,
      modelName: "webhook",
    }
  );

  webhook.associate = function (models) {
    // associations can be defined here
  };

  return webhook;
};
