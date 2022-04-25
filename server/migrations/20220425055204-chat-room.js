"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("chat", "room_id", {
      type: Sequelize.DataTypes.INTEGER,
    });
    await queryInterface.addConstraint("chat", {
      fields: ["room_id"],
      type: "foreign key",
      name: "chat-room-reference",
      references: {
        table: "room",
        field: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("chat", "chat-room-reference");

    await queryInterface.removeColumn("chat", "room_id");
  },
};
