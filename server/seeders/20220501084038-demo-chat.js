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
      "chat",
      [
        {
          user_id: 1,
          room_id: 1,
          content: "안녕하세요1",
          createdAt: new Date(2022, 03, 25, 3, 50),
          updatedAt: new Date(2022, 03, 25, 3, 50),
        },
        {
          user_id: 2,
          room_id: 1,
          content: "안녕하세요2",
          createdAt: new Date(2022, 03, 26, 3, 50),
          updatedAt: new Date(2022, 03, 26, 3, 50),
        },
        {
          user_id: 2,
          room_id: 1,
          content: "테스트용채팅입니다3",
          createdAt: new Date(2022, 03, 27, 3, 50),
          updatedAt: new Date(2022, 03, 27, 3, 50),
        },
        {
          user_id: 1,
          room_id: 2,
          content: "2번룸 채팅1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 3,
          room_id: 2,
          content: "2번룸 채팅2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 3,
          room_id: 2,
          content: "2번룸 채팅3",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 3,
          room_id: 3,
          content: "3번룸 채팅1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 2,
          room_id: 3,
          content: "3번룸 채팅2",
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
    await queryInterface.bulkDelete("chat", null, {});
  },
};
