module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("webhooks", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      customerName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "customer_name",
      },
      customerEmail: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "customer_email",
      },
      orderNumber: {
        type: Sequelize.STRING,
        field: "order_number",
      },
      productName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "product_name",
      },
      productId: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "product_id",
      },
      reviewRequestId: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "review_request_id",
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
    await queryInterface.dropTable("webhooks");
  },
};
