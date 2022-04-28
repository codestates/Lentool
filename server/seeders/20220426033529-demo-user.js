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
      "user",
      [
        {
          email: "test1@naver.com",
          nickname: "test1",
          password: "aaaa1111",
          user_address: "인천광역시",
          user_photo: "dummydata",
          latitude: "37.527724129319196",
          longitude: "126.63137310656668",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "test2@naver.com",
          nickname: "test2",
          password: "aaaa2222",
          user_address: "부산광역시",
          user_photo: "dummydata",
          latitude: "35.16071739610292",
          longitude: "129.16848274023494",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "test3@naver.com",
          nickname: "test3",
          password: "aaaa3333",
          user_address: "서울특별시",
          user_photo: "dummydata",
          latitude: "37.512837064966334",
          longitude: "127.08158550561402",
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
    await queryInterface.bulkDelete("user", null, {});
  },
};
