"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "post",
      [
        {
          title: "망치",
          photo1: "sample1",
          photo2: "sample2",
          photo3: "sample3",
          description: "망치공유",
          price: 1300,
          user_id: 1,
          islend: false,
          address: "saㅡple address",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "드라이버",
          photo1: "sample1",
          photo2: "sample2",
          photo3: "sample3",
          description: "드라이버공유",
          price: 1500,
          user_id: 1,
          islend: false,
          address: "sanㅡle address",
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
  },
};
