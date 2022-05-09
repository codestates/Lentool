const { post: postModel, user: userModel } = require("../../models");

module.exports = {
  main: async (req, res) => {
    try {
      const postData = await postModel.findOne({
        where: { id: req.params.id },
      });
      const userData = await userModel.findOne({
        where: { id: postData.dataValues.user_id },
      });

      const data = {
        title: postData.dataValues.title,
        id: userData.dataValues.id,
        photo1: postData.dataValues.photo1,
        photo2: postData.dataValues.photo2,
        photo3: postData.dataValues.photo3,
        description: postData.dataValues.description,
        price: postData.dataValues.price,
        address: postData.dataValues.address,
        nickname: userData.dataValues.nickname,
        user_photo: userData.dataValues.user_photo,
        post_id: postData.dataValues.id,
        islend: postData.dataValues.islend,
      };

      console.log(data);
      return res.status(200).json({ data: { post: data }, message: "ok" });
    } catch (err) {
      console.log(err);
      console.log("포스트 오류");
      return res.status(500).json({ data: null, message: "서버오류" });
    }
  },
};
