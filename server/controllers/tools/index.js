const { post: postModel, user: userModel } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");

module.exports = {
  tools: async (req, res) => {
    const userInfo = isAuthorized(req);

    try {
      if (!userInfo) {
        return res.status(400).json({
          data: null,
          message: "invalid access token",
        });
      }
      const { id, user_address, latitude, longitude } = userInfo;
      const { title, price, description } = req.body;
      const filepath1 = req.files[0]
        ? `/postimage/${req.files[0].filename}`
        : undefined;
      const filepath2 = req.files[1]
        ? `/postimage/${req.files[1].filename}`
        : "emty";
      const filepath3 = req.files[2]
        ? `/postimage/${req.files[2].filename}`
        : "emty";
      if (!title || !price || !description || !filepath1) {
        return res.status(400).json({
          data: null,
          message: "필수 정보 누락",
        });
      }
      postModel
        .create({
          title,
          photo1: filepath1,
          photo2: filepath2,
          photo3: filepath3,
          description,
          price,
          user_id: id,
          address: user_address,
          latitude,
          longitude,
        })
        .then((created) => {
          if (!created) {
            return res
              .status(500)
              .json({ data: null, message: "데이터 저장 실패" });
          }
          return res.status(200).json({ data: null, message: "ok" });
        });
    } catch (err) {
      res.status(500).json({ data: err, message: "server error" });
    }

    // return res.status(200).json({ data: req.files[0].filename, messege: "ok" });
  },
};