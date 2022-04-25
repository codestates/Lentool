"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    static associate(models) {
      post.belongsTo(models.user, {
        foreignKey: "user_id",
        sourceKey: "id",
      });
      post.hasMany(models.room, {
        foreignKey: "post_id",
        sourceKey: "id",
      });
    }
  }
  post.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: DataTypes.STRING,
      photo1: DataTypes.STRING,
      photo2: DataTypes.STRING,
      photo3: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.INTEGER,
      islend: DataTypes.BOOLEAN,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "post",
    }
  );
  return post;
};
