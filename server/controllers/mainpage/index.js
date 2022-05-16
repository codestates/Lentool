const { post: postModel } = require("../../models");
const { getDistance } = require("../posts/function");
const sequelize = require("sequelize");
const Op = sequelize.Op;

module.exports = {
  main: async (req, res) => {
    const {
      address: user_address,
      latitude: user_latitude,
      longitude: user_longitude,
    } = req.body;

    try {
      if (!user_address || !user_latitude || !user_longitude) {
        return res.status(400).json({
          data: null,
          message: "요구사항을 모두 보내주세요",
        });
      }

      const address = user_address.split(" ")[0];

      const nearPosts = await postModel.findAll({
        where: {
          address: {
            [Op.like]: "%" + address + "%",
          },
        },
        limit: 2,
      });

      res.status(200).json({ data: { posts: nearPosts }, message: "ok" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ data: err, message: "server error" });
    }
  },
  healthcheck: () => {
    res.status(201).json({ data: null, message: "ok" });
  },
};
