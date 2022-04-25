"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("chat", "user_id", {
      type: Sequelize.DataTypes.INTEGER,
    });
    await queryInterface.addConstraint("chat", {
      fields: ["user_id"],
      type: "foreign key",
      name: "chat-user-reference",
      references: {
        table: "user",
        field: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("chat", "chat-user-reference");

    await queryInterface.removeColumn("chat", "user_id");
  },
};
