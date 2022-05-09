"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "room",
      [
        {
          flag: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          post_id: 1,
        },
        {
          flag: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          post_id: 1,
        },
        {
          flag: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          post_id: 3,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("room", null, {});
  },
};
