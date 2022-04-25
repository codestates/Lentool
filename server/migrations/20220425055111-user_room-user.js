"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("user_room", "user_id", {
      type: Sequelize.DataTypes.INTEGER,
    });
    await queryInterface.addConstraint("user_room", {
      fields: ["user_id"],
      type: "foreign key",
      name: "user_room-user-reference",
      references: {
        table: "user",
        field: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "user_room",
      "user_room-user-reference"
    );

    await queryInterface.removeColumn("user_room", "user_id");
  },
};
