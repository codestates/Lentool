"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "user_room",
      [
        {
          user_id1: 1,
          user_id2: 2,
          room_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id1: 2,
          user_id2: 1,
          room_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id1: 1,
          user_id2: 3,
          room_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id1: 3,
          user_id2: 1,
          room_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id1: 2,
          user_id2: 3,
          room_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id1: 3,
          user_id2: 2,
          room_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
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
    await queryInterface.bulkDelete("user_room", null, {});
  },
};
