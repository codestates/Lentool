"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class room extends Model {
    static associate(models) {
      room.belongsTo(models.post, {
        foreignKey: "post_id",
        sourceKey: "id",
      });
      room.hasMany(models.chat, {
        foreignKey: "room_id",
        sourceKey: "id",
      });
      room.hasMany(models.user_room, {
        foreignKey: "room_id",
        sourceKey: "id",
      });
    }
  }
  room.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      flag: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "room",
      freezeTableName: true,
      tableName: "room",
    }
  );
  return room;
};
