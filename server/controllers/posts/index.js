const { post: postModel, user: userModel } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");
const { getDistance } = require("./function");
const sequelize = require("sequelize");
const Op = sequelize.Op;

module.exports = {
  main: async (req, res) => {
    const userInfo = isAuthorized(req);

    try {
      if (!userInfo) {
        return res.status(400).json({
          data: null,
          message: "invalid access token",
        });
      }
      const {
        user_address,
        latitude: user_latitude,
        longitude: user_longitude,
      } = userInfo;
      const address = user_address.split(" ")[0];
      console.log(address);

      const nearPosts = await postModel.findAll({
        where: {
          address: {
            [Op.like]: "%" + address + "%",
          },
        },
      });

      const sendData = [];
      for (let i = 0; i < nearPosts.length; i++) {
        const { latitude: post_latitude, longitude: post_longitude } =
          nearPosts[i].dataValues;

        if (
          getDistance(
            user_latitude,
            user_longitude,
            post_latitude,
            post_longitude
          ) < 2000
        ) {
          sendData.push(nearPosts[i]);
        }
      }

      res.status(200).json({ data: { posts: sendData }, message: "ok" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ data: err, message: "server error" });
    }
  },
  search: async (req, res) => {
    const userInfo = isAuthorized(req);
    console.log(req.query);

    try {
      if (!userInfo) {
        return res.status(400).json({
          data: null,
          message: "invalid access token",
        });
      }
      const {
        user_address,
        latitude: user_latitude,
        longitude: user_longitude,
      } = userInfo;
      const address = user_address.split(" ")[0];
      console.log(address);

      const nearPosts = await postModel.findAll({
        where: {
          address: {
            [Op.like]: "%" + address + "%",
          },
          title: {
            [Op.like]: "%" + req.query.title + "%",
          },
        },
      });

      const sendData = [];
      for (let i = 0; i < nearPosts.length; i++) {
        const { latitude: post_latitude, longitude: post_longitude } =
          nearPosts[i].dataValues;

        if (
          getDistance(
            user_latitude,
            user_longitude,
            post_latitude,
            post_longitude
          ) < 2000
        ) {
          sendData.push(nearPosts[i]);
        }
      }

      res.status(200).json({ data: { posts: sendData }, message: "ok" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ data: err, message: "server error" });
    }
  },
};
