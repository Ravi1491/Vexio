"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class review_receive extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  review_receive.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "rating",
      },
      feedback: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "feedback",
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
      modelName: "review_receive",
    }
  );

  review_receive.associate = function (models) {
    // associations can be defined here
  };

  return review_receive;
};
