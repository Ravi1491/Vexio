"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class review_request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  review_request.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      productSlug: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "product_slug",
      },
      customerEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "customer_email",
      },
      productId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "product_id",
      },
      status: {
        type: DataTypes.ENUM('PENDING', 'SENT', 'RECEIVED'),
        allowNull: false,
        defaultValue: 'PENDING',
        field: 'status'
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
      modelName: "review_request",
    }
  );

  review_request.associate = function (models) {
    // associations can be defined here
  };

  return review_request;
};
