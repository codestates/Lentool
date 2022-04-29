"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      // define association here
      user.hasMany(models.post, {
        foreignKey: "user_id",
        sourceKey: "id",
      });
      user.hasMany(models.chat, {
        foreignKey: "user_id",
        sourceKey: "id",
      });
      user.hasMany(models.user_room, {
        foreignKey: "user_id",
        sourceKey: "id",
      });
    }
  }

  user.init(
    {
      //id 프로퍼티 추가
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: DataTypes.STRING,
      nickname: DataTypes.STRING,
      password: DataTypes.STRING,
      user_address: DataTypes.STRING,
      user_photo: DataTypes.STRING,
      salt: DataTypes.STRING,
      latitude: DataTypes.STRING,
      longitude: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user",
      freezeTableName: true,
      tableName: "user",
    }
  );
  return user;
};
