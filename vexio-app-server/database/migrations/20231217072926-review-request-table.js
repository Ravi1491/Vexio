"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("review_requests", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      productSlug: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "product_slug",
      },
      customerEmail: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "customer_email",
      },
      productId: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "product_id",
      },
      status: {
        type: Sequelize.ENUM('PENDING', 'SENT', 'RECEIVED'),
        allowNull: false,
        defaultValue: 'PENDING',
        field: 'status'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "created_at",
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "updated_at",
      },
      deletedAt: {
        type: Sequelize.DATE,
        field: "deleted_at",
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("review_requests");
  },
};
