"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user_room extends Model {
    static associate(models) {
      user_room.belongsTo(models.user, {
        foreignKey: "user_id",
        sourceKey: "id",
      });
      user_room.belongsTo(models.room, {
        foreignKey: "room_id",
        sourceKey: "id",
      });
    }
  }
  user_room.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "user_room",
    }
  );
  return user_room;
};
