'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      assignedTo: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM("To-Do", "Started", "Finished"),
        defaultValue: "To-Do"
      },
      tags: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      overdue: {
        type: Sequelize.BOOLEAN
      },
      deadline: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tasks');
  }
};