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
