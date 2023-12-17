'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return Promise.all([
      await queryInterface.addColumn(
        "users", 
        "payment_order_id",
        {
          type: Sequelize.STRING,
          allowNull: true
        }
        ),
        await queryInterface.addColumn(
          "users", 
          "payment_status",
          {
            type: Sequelize.STRING,
            allowNull: true
          }
          ),
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
