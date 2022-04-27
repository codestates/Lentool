"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("post", "user_id", {
      type: Sequelize.DataTypes.INTEGER,
    });
    await queryInterface.addConstraint("post", {
      fields: ["user_id"],
      type: "foreign key",
      name: "post-user-reference",
      references: {
        table: "user",
        field: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("post", "post-user-reference");

    await queryInterface.removeColumn("post", "user_id");
  },
};
