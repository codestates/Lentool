"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("room", "post_id", {
      type: Sequelize.DataTypes.INTEGER,
    });
    await queryInterface.addConstraint("room", {
      fields: ["post_id"],
      type: "foreign key",
      name: "room-post-reference",
      references: {
        table: "post",
        field: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("room", "room-post-reference");

    await queryInterface.removeColumn("room", "post_id");
  },
};
