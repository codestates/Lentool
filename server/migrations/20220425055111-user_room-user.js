"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("user_room", "user_id1", {
      type: Sequelize.DataTypes.INTEGER,
    });
    await queryInterface.addColumn("user_room", "user_id2", {
      type: Sequelize.DataTypes.INTEGER,
    });
    await queryInterface.addConstraint("user_room", {
      fields: ["user_id1"],
      type: "foreign key",
      name: "user_room-user-reference1",
      references: {
        table: "user",
        field: "id",
      },
    });
    await queryInterface.addConstraint("user_room", {
      fields: ["user_id2"],
      type: "foreign key",
      name: "user_room-user-reference2",
      references: {
        table: "user",
        field: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "user_room",
      "user_room-user-reference1"
    );
    await queryInterface.removeConstraint(
      "user_room",
      "user_room-user-reference2"
    );

    await queryInterface.removeColumn("user_room", "user_id1");
    await queryInterface.removeColumn("user_room", "user_id2");
  },
};
