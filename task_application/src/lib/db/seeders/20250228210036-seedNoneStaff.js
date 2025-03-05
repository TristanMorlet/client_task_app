'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Staffs', [{
      name: "None",
      dateAdded: new Date(),
      email: "",
      role: "",
      tasksAssigned: 0,
      tasksCompleted: 0,
      taskList: Sequelize.literal("ARRAY[]::jsonb[]"),
      completeList: Sequelize.literal("ARRAY[]::jsonb[]"),
      userId: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Staffs", {name: "None"})
  }
};
