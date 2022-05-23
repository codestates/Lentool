const { user: userModel } = require("../../models");
const { chat: chatModel } = require("../../models");
const { post: postModel } = require("../../models");
const { user_room: user_roomModel } = require("../../models");
const { room: roomModel } = require("../../models");
const { generateAccessToken, isAuthorized } = require("../tokenFunctions");
const crypto = require("crypto");
const fs = require("fs");
const axios = require("axios");
require("dotenv").config();

module.exports = {
  mypage: async (req, res) => {
    const userInfo = isAuthorized(req);
    if (!userInfo) {
      return res.status(400).json({ message: "유효하지 않은 토큰" });
    }
    try {
      const posts = await postModel.findAll({
        attributes: ["id", "title", "photo1", "address", "price"],
        where: { user_id: userInfo.id },
      });
      const user = await userModel.findOne({
        attributes: ["id", "email", "nickname", "user_address", "user_photo"],
        where: { id: userInfo.id },
      });
      return res
        .status(200)
        .json({ message: "ok", data: { user_posts: posts, userinfo: user } });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ data: null, message: "server error" });
    }
  },
  signout: async (req, res) => {
    const userInfo = isAuthorized(req);
    const formUrlEncoded = (x) =>
      Object.keys(x).reduce(
        (p, c) => p + `&${c}=${encodeURIComponent(x[c])}`,
        ""
      );
    if (!userInfo) {
      return res.status(400).json({ message: "유효하지 않은 토큰" });
    }
    const delId = userInfo.id;
    const user = await userModel.findOne({ where: { id: delId } });
    const userPost = await postModel.findAll({ where: { user_id: delId } });
    const delUserRoom = await user_roomModel.findAll({
      where: { user_id2: delId },
    });

    try {
      if (user && user.dataValues.kakao_id !== null) {
        const kakaosignout = await axios.post(
          "https://kapi.kakao.com/v1/user/unlink",
          formUrlEncoded({
            target_id_type: "user_id",
            target_id: `${user.dataValues.kakao_id}`,
          }),
          {
            headers: {
              "Content-type": "application/x-www-form-urlencoded",
              Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_ADMIN}`,
            },
          }
        );
      }
      let delpost_id = [];
      let delchat_roomid = [];
      if (delUserRoom) {
        for (let i = 0; i < delUserRoom.length; i++) {
          delchat_roomid.push(delUserRoom[i].dataValues.room_id);
        }
      }

      if (userPost) {
        for (let i = 0; i < userPost.length; i++) {
          delpost_id.push(userPost[i].dataValues.id);
          if (userPost[i].dataValues.photo1 !== "empty") {
            const deleteimg = userPost[i].dataValues.photo1.slice(11);
            if (fs.existsSync("./postimg/" + deleteimg)) {
              fs.unlinkSync("./postimg/" + deleteimg);
              console.log("photo1 deleted");
            }
          }
          if (userPost[i].dataValues.photo2 !== "empty") {
            const deleteimg = userPost[i].dataValues.photo2.slice(11);
            if (fs.existsSync("./postimg/" + deleteimg)) {
              fs.unlinkSync("./postimg/" + deleteimg);
              console.log("photo1 deleted");
            }
          }
          if (userPost[i].dataValues.photo3 !== "empty") {
            const deleteimg = userPost[i].dataValues.photo3.slice(11);
            if (fs.existsSync("./postimg/" + deleteimg)) {
              fs.unlinkSync("./postimg/" + deleteimg);
              console.log("photo1 deleted");
            }
          }
        }
      }

      for (let i = 0; i < delchat_roomid.length; i++) {
        const deletechat = await chatModel.destroy({
          where: { room_id: delchat_roomid[i] },
        });
      }
      const urd = await user_roomModel.destroy({ where: { user_id1: delId } });
      const urd2 = await user_roomModel.destroy({ where: { user_id2: delId } });
      for (let i = 0; i < delpost_id.length; i++) {
        const deleteroom = await roomModel.destroy({
          where: { post_id: delpost_id[i] },
        });
      }
      const pd = await postModel.destroy({ where: { user_id: delId } });
      const ud = await userModel.destroy({
        where: { id: delId },
      });

      res.status(200).json({ data: null, message: "탈퇴 성공" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ data: null, message: "server error" });
    }
  },
  edit: (req, res) => {
    const userInfo = isAuthorized(req);
    if (!userInfo) {
      return res.status(400).json({ message: "유효하지 않은 토큰" });
    }
    const {
      password: inputPassword,
      nickname,
      user_address,
      longitude,
      latitude,
    } = req.body;

    // const imgPath = "/image/" + req.file.filename;
    if (
      !inputPassword &
      !nickname /*& !imgPath*/ &
      !user_address /*추후수정 */
    ) {
      return res.status(400).json({ message: "입력값 없음" });
    }
    if (inputPassword) {
      const salt = Math.round(new Date().valueOf() * Math.random()) + "";
      const hashPassword = crypto
        .createHash("sha512")
        .update(inputPassword + salt)
        .digest("hex");
      userModel
        .update(
          { password: hashPassword, salt },
          { where: { id: userInfo.id } }
        )
        .then(([result]) => {
          if (!result) {
            return res.status(500).json({ message: "password update fail" });
          } else {
            return res.status(200).json({ message: "password 수정 성공" });
          }
        })
        .catch((err) => {
          res.status(500).json({ message: "server error" });
        });
    }
    if (nickname) {
      userModel
        .update({ nickname: nickname }, { where: { id: userInfo.id } })
        .then(([result]) => {
          if (!result) {
            return res.status(500).json({ message: "nickname update fail" });
          } else {
            return res.status(200).json({ message: "nickname 수정 성공" });
          }
        })
        .catch((err) => {
          res.status(500).json({ message: "server error" });
        });
    }

    if (user_address && longitude && latitude) {
      //여기는 주소 방법 학습후 수정
      userModel
        .update(
          {
            user_address: user_address,
            longitude: longitude,
            latitude: latitude,
          },
          { where: { id: userInfo.id } }
        )
        .then(([result]) => {
          if (!result) {
            return res.status(500).json({ message: "address update fail" });
          } else {
            return res.status(200).json({ message: "address 수정 성공" });
          }
        })
        .catch((err) => {
          res.status(500).json({ message: "server error" });
        });
    }
  },
  editdp: async (req, res) => {
    const userInfo = isAuthorized(req);

    if (!userInfo) {
      return res.status(400).json({ message: "유효하지 않은 토큰" });
    }

    if (!req.files[0]) {
      return res.status(400).json({ message: "입력값 없음" });
    }
    const imgPath = `/userimage/${req.files[0].filename}`;
    const lastimg = await userModel.findOne({
      attributes: ["user_photo"],
      where: { id: userInfo.id },
    });

    if (imgPath) {
      if (lastimg.dataValues.user_photo !== "empty") {
        const deleteimg = lastimg.dataValues.user_photo.slice(11);
        try {
          if (fs.existsSync("./userimg/" + deleteimg)) {
            fs.unlinkSync("./userimg/" + deleteimg);
            console.log("img deleted");
          }
        } catch (err) {
          console.log(err, "img delete err");
        }
      }
      userModel
        .update({ user_photo: imgPath }, { where: { id: userInfo.id } })
        .then(([result]) => {
          if (!result) {
            return res.status(500).json({ message: "user_photo update fail" });
          } else {
            return res.status(200).json({
              message: "user_photo 수정 성공",
              data: { user_photo: imgPath },
            });
          }
        })
        .catch((err) => {
          res.status(500).json({ message: "server error" });
        });
    }
  },
  logout: (req, res) => {
    const userInfo = isAuthorized(req);
    const formUrlEncoded = (x) =>
    Object.keys(x).reduce(
      (p, c) => p + `&${c}=${encodeURIComponent(x[c])}`,
      ""
    );

    try {
      if (!userInfo) {
        return res
          .status(200)
          .json({ data: null, message: "이미 로그아웃 되었습니다." });
      }

      const user = await userModel.findOne({ where: { id: userInfo.id } });
      if (user && user.dataValues.kakao_id !== null) {
        const kakaologout = await axios.post(
          "https://kapi.kakao.com/v1/user/logout",
          formUrlEncoded({
            target_id_type: "user_id",
            target_id: `${user.dataValues.kakao_id}`,
          }),
          {
            headers: {
              "Content-type": "application/x-www-form-urlencoded",
              Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_ADMIN}`,
            },
          }
        );
      }

      return res.status(200).json({ data: null, message: "ok" });
    } catch (err) {
      console.log("로그아웃서버에러");
      res.status(500).json({ data: err, message: "server error" });
    }
  },
  login: async (req, res) => {
    const { id, password: inputPassword } = req.body;

    try {
      const userInfo = await userModel.findOne({
        where: { email: id },
      });
      if (!userInfo) {
        return res
          .status(401)
          .json({ data: null, message: "해당하는 회원이 존재하지 않습니다" });
      }
      const { password: dbPassword, salt } = userInfo;
      const hashPassword = crypto
        .createHash("sha512")
        .update(inputPassword + salt)
        .digest("hex");

      if (dbPassword !== hashPassword) {
        console.log(dbPassword);
        console.log(hashPassword);
        return res
          .status(400)
          .json({ data: null, message: "비밀번호가 틀렸습니다" });
      }
      delete userInfo.dataValues.password;
      delete userInfo.dataValues.salt;
      const accessToken = generateAccessToken(userInfo.dataValues);

      if (accessToken) {
        return res.status(200).json({
          message: "ok",
          data: { accessToken, userInfo: userInfo.dataValues },
        });
      }
    } catch (err) {
      console.log("로그인서버에러");
      res.status(500).json({ data: err, message: "server error" });
    }
  },
  signup: async (req, res) => {
    const {
      email,
      nickname,
      password: inputPassword,
      user_address,
      longitude,
      latitude,
    } = req.body;
    if (
      !email ||
      !inputPassword ||
      !nickname ||
      !user_address ||
      !longitude ||
      !latitude
    ) {
      return res.status(400).json({ message: "내용을 전부 기입해 주세요" });
    }
    const salt = Math.round(new Date().valueOf() * Math.random()) + "";
    const hashPassword = crypto
      .createHash("sha512")
      .update(inputPassword + salt)
      .digest("hex");
    try {
      const registed = await userModel.create({
        email,
        password: hashPassword,
        nickname,
        salt,
        user_address,
        longitude,
        latitude,
      });
      if (!registed) {
        return res.status(500).json({ message: "fail" });
      } else {
        return res.status(200).json({ message: "회원가입 성공" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ data: err, message: "server error" });
    }
  },
  checkemail: async (req, res) => {
    const checkemail = req.body.email;
    console.log(checkemail);
    try {
      if (checkemail) {
        const emailcheck = await userModel.findOne({
          where: { email: checkemail },
        });

        if (emailcheck) {
          return res.status(200).json({ message: "이메일 중복" });
        } else {
          return res.status(200).json({ message: "중복 없음" });
        }
      } else {
        return res.status(400).json({ message: "내용을 기입해 주세요" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "server error" });
    }
  },
  checknickname: async (req, res) => {
    const checknickname = req.body.nickname;
    try {
      if (checknickname) {
        const nicknamecheck = await userModel.findOne({
          where: { nickname: checknickname },
        });
        if (nicknamecheck) {
          return res.status(200).json({ message: "닉네임 중복" });
        } else {
          return res.status(200).json({ message: "중복 없음" });
        }
      } else {
        return res.status(400).json({ message: "내용을 기입해 주세요" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "server error" });
    }
  },
  oauth: async (req, res) => {
    const formUrlEncoded = (x) =>
      Object.keys(x).reduce(
        (p, c) => p + `&${c}=${encodeURIComponent(x[c])}`,
        ""
      );

    try {
      const kakaoToken = await axios.post(
        "https://kauth.kakao.com/oauth/token",
        formUrlEncoded({
          grant_type: "authorization_code",
          client_id: `${process.env.REACT_APP_KAKAO_REST_API}`,
          redirect_uri: `${process.env.REACT_APP_KAKAO_REDIRECT_URI}`,
          code: req.query.code,
        }),
        { "Content-type": "application/x-www-form-urlencoded;charset=utf-8" }
      );

      const kakaoid = await axios.get(
        "https://kapi.kakao.com/v1/user/access_token_info",
        {
          headers: {
            Authorization: `Bearer ${kakaoToken.data.access_token}`,
          },
        }
      );
      const userInfo = await userModel.findOne({
        where: { kakao_id: kakaoid.data.id },
      });
      if (!userInfo) {
        const create = await userModel.create({
          email: null,
          password: null,
          nickname: null,
          salt: null,
          user_address: null,
          longitude: null,
          latitude: null,
          kakao_id: kakaoid.data.id,
        });
        const accessToken = generateAccessToken(create.dataValues);
        if (accessToken) {
          return res.status(200).json({
            message: "회원가입 필요",
            data: { accessToken, userInfo: create.dataValues },
          });
        }
      } else if (
        userInfo.dataValues.nickname === null ||
        userInfo.dataValues.user_address === null ||
        userInfo.dataValues.longitude === null ||
        userInfo.dataValues.latitude === null
      ) {
        delete userInfo.dataValues.password;
        delete userInfo.dataValues.salt;
        delete userInfo.dataValues.email;
        const accessToken = generateAccessToken(userInfo.dataValues);

        if (accessToken) {
          return res.status(200).json({
            message: "회원가입 필요",
            data: { accessToken, userInfo: userInfo.dataValues },
          });
        }
      } else {
        delete userInfo.dataValues.password;
        delete userInfo.dataValues.salt;
        delete userInfo.dataValues.email;
        const accessToken = generateAccessToken(userInfo.dataValues);

        if (accessToken) {
          return res.status(200).json({
            message: "ok",
            data: { accessToken, userInfo: userInfo.dataValues },
          });
        }
      }
    } catch (err) {
      return res.status(500).json({ data: err, message: "server error" });
    }
  },
  oauthsignup: async (req, res) => {
    const userInfo = isAuthorized(req);
    if (!userInfo) {
      return res
        .status(400)
        .json({ data: null, message: "유효하지 않은 토큰" });
    }
    if (!userInfo.kakao_id) {
      return res
        .status(400)
        .json({ data: null, message: "유효하지 않은 토큰" });
    }
    if (
      !req.body.nickname ||
      !req.body.user_address ||
      !req.body.latitude ||
      !req.body.longitude
    ) {
      return res.status(400).json({ data: null, message: "필수 정보 누락" });
    }
    try {
      const updateData = {
        nickname: req.body.nickname,
        user_address: req.body.user_address,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
      };
      console.log(userInfo);
      const newuser = await userModel.update(updateData, {
        where: { kakao_id: userInfo.kakao_id },
      });
      const newUserInfo = await userModel.findOne({
        where: { kakao_id: userInfo.kakao_id },
      });
      delete newUserInfo.dataValues.password;
      delete newUserInfo.dataValues.salt;
      delete newUserInfo.dataValues.email;

      const accessToken = generateAccessToken(newUserInfo.dataValues);
      if (accessToken) {
        return res.status(200).json({
          message: "ok",
          data: { accessToken, userInfo: newUserInfo.dataValues },
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ data: err, message: "server error" });
    }
  },
};
