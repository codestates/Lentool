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
          password:
            "8283cf03d01faea813ffa9a44fb20ea71b3bfb866fc8477c774c4dac4436a6b6cd2a99cd1fe9ab89dafaf3a8121a56fb1809b1a4595972e04da5be141b66b527",
          user_address: "인천광역시",
          user_photo: "dummydata1",
          latitude: "37.527724129319196",
          longitude: "126.63137310656668",
          createdAt: new Date(),
          updatedAt: new Date(),
          salt: "1384507852400",
        },
        {
          email: "test2@naver.com",
          nickname: "test2",
          password:
            "5b8a71be0012d09f7ac388bbe5ae81c85aa52f7fe31cebac5b29095b8da1b7a23c99aeb1cb93f16fedbae98cfa79df515ab8cc8294f4c9e287d066418c9e762d",
          user_address: "부산광역시",
          user_photo: "dummydata2",
          latitude: "35.16071739610292",
          longitude: "129.16848274023494",
          createdAt: new Date(),
          updatedAt: new Date(),
          salt: "1335498102055",
        },
        {
          email: "test3@naver.com",
          nickname: "test3",
          password:
            "b0dcf033f1d181a98ced3a1a370ef5a005c03d1ae2c65e4f21e8198436b158f044b0af59d92f3d2802666664ebd254d3102de17003232795884ed0559151429b",
          user_address: "서울특별시",
          user_photo: "dummydata3",
          latitude: "37.512837064966334",
          longitude: "127.08158550561402",
          createdAt: new Date(),
          updatedAt: new Date(),
          salt: "1155160435697",
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
