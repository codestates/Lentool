"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "post",
      [
        {
          title: "망치 빌려드립니다",
          photo1: "emty",
          photo2: "emty",
          photo3: "emty",
          description: "망치 빌려드립니다",
          price: 1000,
          islend: 0,
          address: "인천광역시",
          latitude: "37.527724129319196",
          longitude: "126.63137310656668",
          createdAt: new Date(),
          updatedAt: new Date(),
          user_id: 1,
        },
        {
          title: "전동드릴",
          photo1: "emty",
          photo2: "emty",
          photo3: "emty",
          description: "전동드릴입니다.",
          price: 2000,
          islend: 0,
          address: "부산광역시",
          latitude: "35.16071739610292",
          longitude: "129.16848274023494",
          createdAt: new Date(),
          updatedAt: new Date(),
          user_id: 2,
        },
        {
          title: "컴퓨터 조립용 드라이버",
          photo1: "emty",
          photo2: "emty",
          photo3: "emty",
          description: "드라이버입니다",
          price: 1500,
          islend: 0,
          address: "서울특별시",
          latitude: "37.512837064966334",
          longitude: "127.08158550561402",
          createdAt: new Date(),
          updatedAt: new Date(),
          user_id: 3,
        },
        {
          title: "몽키스패너 빌려드립니다",
          photo1: "emty",
          photo2: "emty",
          photo3: "emty",
          description: "사람 때리는데 쓰면 안됩니다",
          price: 1500,
          islend: 0,
          address: "인천광역시",
          latitude: "37.527724129319196",
          longitude: "126.63137310656668",
          createdAt: new Date(),
          updatedAt: new Date(),
          user_id: 1,
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

    await queryInterface.bulkDelete("post", null, {});
  },
};
