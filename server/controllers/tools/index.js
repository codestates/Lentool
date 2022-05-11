const { post: postModel, user: userModel } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");
const fs = require("fs");

module.exports = {
  tools: async (req, res) => {
    const userInfo = isAuthorized(req);
    try {
      if (!userInfo) {
        if (req.files) {
          for (let i = 0; i < req.files.length; i++) {
            fs.unlinkSync("./postimg/" + req.files[i].filename);
          }
        }
        return res.status(400).json({
          data: null,
          message: "invalid access token",
        });
      }
      const { id, user_address, latitude, longitude } = userInfo;
      const { title, price, description, tag } = req.body;
      if (!req.files) {
        return res.status(400).json({
          data: null,
          message: "사진 누락",
        });
      }

      const filepath1 = req.files[0]
        ? `/postimage/${req.files[0].filename}`
        : undefined;
      const filepath2 = req.files[1]
        ? `/postimage/${req.files[1].filename}`
        : "empty";
      const filepath3 = req.files[2]
        ? `/postimage/${req.files[2].filename}`
        : "empty";

      if (!title || !price || !description || !filepath1 || !tag) {
        if (req.files) {
          for (let i = 0; i < req.files.length; i++) {
            fs.unlinkSync("./postimg/" + req.files[i].filename);
          }
        }
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
          tag,
        })
        .then((created) => {
          if (!created) {
            return res
              .status(500)
              .json({ data: null, message: "데이터 저장 실패" });
          }
          return res.status(200).json({
            data: { post: { id: created.dataValues.id } },
            message: "ok",
          });
        });
    } catch (err) {
      return res.status(500).json({ data: err, message: "server error" });
    }

    // return res.status(200).json({ data: req.files[0].filename, messege: "ok" });
  },

  deletePost: async (req, res) => {
    const userInfo = isAuthorized(req);
    if (!userInfo) {
      return res.status(400).json({
        data: null,
        message: "invalid access token",
      });
    }
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ data: null, message: "요청 정보 누락" });
    }
    console.log(id);
    const userCheck = await postModel.findOne({
      where: { id, user_id: userInfo.id },
    });
    if (!userCheck) {
      return res
        .status(400)
        .json({ data: null, message: "올바른 요청이 아닙니다." });
    }

    try {
      if (userCheck.dataValues.photo1 !== "empty") {
        const deleteimg = userCheck.dataValues.photo1.slice(11);
        fs.unlinkSync("./postimg/" + deleteimg);
        console.log("photo1 deleted");
      }
      if (userCheck.dataValues.photo2 !== "empty") {
        const deleteimg = userCheck.dataValues.photo2.slice(11);
        fs.unlinkSync("./postimg/" + deleteimg);
        console.log("photo2 deleted");
      }
      if (userCheck.dataValues.photo3 !== "empty") {
        const deleteimg = userCheck.dataValues.photo3.slice(11);
        fs.unlinkSync("./postimg/" + deleteimg);
        console.log("photo3 deleted");
      }
      const destroypost = await postModel.destroy({
        where: { id },
      });
      return res.status(200).json({ data: null, message: "삭제 성공" });
    } catch (err) {
      return res.status(500).json({ data: err, message: "server error" });
    }
  },
  edit: async (req, res) => {
    try {
      const userInfo = isAuthorized(req);
      if (!userInfo) {
        if (req.files) {
          for (let i = 0; i < req.files.length; i++) {
            fs.unlinkSync("./postimg/" + req.files[i].filename);
          }
        }
        return res.status(400).json({
          data: null,
          message: "invalid access token",
        });
      }
      const { id } = req.params;

      if (!id) {
        if (req.files) {
          for (let i = 0; i < req.files.length; i++) {
            fs.unlinkSync("./postimg/" + req.files[i].filename);
          }
        }
        return res.status(400).json({ data: null, message: "요청 정보 누락" });
      }
      const userCheck = await postModel.findOne({
        where: { id, user_id: userInfo.id },
      });
      if (!userCheck) {
        if (req.files) {
          for (let i = 0; i < req.files.length; i++) {
            fs.unlinkSync("./postimg/" + req.files[i].filename);
          }
        }
        return res
          .status(400)
          .json({ data: null, message: "올바른 요청이 아닙니다." });
      }

      if (req.files) {
        if (userCheck.dataValues.photo1 !== "empty") {
          const deleteimg = userCheck.dataValues.photo1.slice(11);
          fs.unlinkSync("./postimg/" + deleteimg);
          console.log("photo1 deleted");
        }
        if (userCheck.dataValues.photo2 !== "empty") {
          const deleteimg = userCheck.dataValues.photo2.slice(11);
          fs.unlinkSync("./postimg/" + deleteimg);
          console.log("photo2 deleted");
        }
        if (userCheck.dataValues.photo3 !== "empty") {
          const deleteimg = userCheck.dataValues.photo3.slice(11);
          fs.unlinkSync("./postimg/" + deleteimg);
          console.log("photo3 deleted");
        }
        const filepath1 = req.files[0]
          ? `/postimage/${req.files[0].filename}`
          : "empty";
        const filepath2 = req.files[1]
          ? `/postimage/${req.files[1].filename}`
          : "empty";
        const filepath3 = req.files[2]
          ? `/postimage/${req.files[2].filename}`
          : "empty";
        const photoupdate = await postModel.update(
          { photo1: filepath1, photo2: filepath2, photo3: filepath3 },
          { where: { id } }
        );
      }

      const { title, description, price, tag, islend } = req.body;
      const updatedata = { title, description, price, tag, islend };

      const result = await postModel.update(updatedata, { where: { id } });
      const senddata = await postModel.findOne({ where: { id } });
      return res.status(200).json({ data: { post: senddata }, message: "ok" });
    } catch (err) {
      return res.status(500).json({ data: err, message: "server error" });
    }
  },
};
