"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class store_product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  store_product.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      storeId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "store_id",
      },
      productTitle: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "product_title",
      },
      productSlug: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "product_slug",
      },
      productId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "product_id",
      },
      metadata: {
        type: DataTypes.JSONB,
        field: "metadata",
        defaultValue: {},
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
      modelName: "store_product",
    }
  );

  store_product.associate = function (models) {
    // associations can be defined here
  };

  return store_product;
};
