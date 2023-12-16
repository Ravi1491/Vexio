module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("store_products", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      storeId: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "store_id",
      },
      productTitle: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "product_title",
      },
      productSlug: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "product_slug",
      },
      productId: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "product_id",
      },
      metadata: {
        type: Sequelize.JSONB,
        field: "metadata",
        defaultValue: {},
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
    await queryInterface.dropTable("store_products");
  },
};
