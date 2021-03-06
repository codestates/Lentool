"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class chat extends Model {
    static associate(models) {
      chat.belongsTo(models.room, {
        foreignKey: "room_id",
        sourceKey: "id",
      });
      chat.belongsTo(models.user, {
        foreignKey: "user_id",
        sourceKey: "id",
      });
    }
  }
  chat.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      content: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "chat",
      freezeTableName: true,
      tableName: "chat",
    }
  );
  return chat;
};
