"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("user_room", "room_id", {
      type: Sequelize.DataTypes.INTEGER,
    });
    await queryInterface.addConstraint("user_room", {
      fields: ["room_id"],
      type: "foreign key",
      name: "user_room-room-reference",
      references: {
        table: "room",
        field: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "user_room",
      "user_room-room-reference"
    );

    await queryInterface.removeColumn("user_room", "room_id");
  },
};
