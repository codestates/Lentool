const { user: userModel } = require("../../models");
const { chat: chatModel } = require("../../models");
const { post: postModel } = require("../../models");
const { user_room: user_roomModel } = require("../../models");
const { generateAccessToken, isAuthorized } = require("../tokenFunctions");
const crypto = require("crypto");

module.exports = {
  mypage: async (req, res) => {
    const userInfo = isAuthorized(req);
    if (!userInfo) {
      return res.status(400).json({ message: "유효하지 않은 토큰" });
    }
    try {
      const posts = await postModel.findall(
        { attributes: id, title, photo, address, price },
        { where: { id: userInfo.id } }
      );
      const user = await userModel.findOne({ where: { id: userInfo.id } });
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
    if (!userInfo) {
      return res.status(400).json({ message: "유효하지 않은 토큰" });
    }
    const delId = userInfo.id;
    Promise.all([
      postModel.destroy({ where: { user_id: delId } }),
      chatModel.destroy({ where: { user_id: delId } }),
      user_roomModel.destroy({ where: { user_id: delId } }),
      userModel.destroy({
        where: { id: delId },
      }),
    ])
      .then(() => res.status(200).json({ data: null, message: "탈퇴 성공" }))
      .catch((err) => {
        console.log(err);
        res.status(500).json({ data: null, message: "server error" });
      });
  },
  edit: (req, res) => {
    const userInfo = isAuthorized(req);
    if (!userInfo) {
      return res.status(400).json({ message: "유효하지 않은 토큰" });
    }
    const {
      password: inputPassword,
      nickname,
      address /*추후변경*/,
    } = req.body;
    const imgPath = "/image/" + req.file.filename;
    if (!inputPassword & !nickname & !imgPath & !address /*추후수정 */) {
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
    if (imgPath) {
      userModel
        .update({ user_photo: imgPath }, { where: { id: userInfo.id } })
        .then(([result]) => {
          if (!result) {
            return res.status(500).json({ message: "user_photo update fail" });
          } else {
            return res.status(200).json({ message: "user_photo 수정 성공" });
          }
        })
        .catch((err) => {
          res.status(500).json({ message: "server error" });
        });
    }
    /*if (address) {   //여기는 주소 방법 학습후 수정
      userModel
        .update(
          { address:address},
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
    }*/
  },
  logout: (req, res) => {
    const userInfo = isAuthorized(req);

    try {
      if (!userInfo) {
        return res
          .status(400)
          .json({ data: null, message: "로그인되지 않은 사용자 입니다" });
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
      address /*추후 변경*/,
    } = req.body;
    if (!email || !inputPassword || !nickname || !address) {
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
        user_address: address /*추후변경*/,
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
  check: async (req, res) => {
    const { email, nickname, userPassword: inputPassword } = req.body;
    const userInfo = isAuthorized(req);

    try {
      if (email) {
        const emailcheck = await userModel.findOne({
          where: { email },
        });
        if (emailcheck) {
          return res.status(200).json({ message: "이메일 중복" });
        } else {
          return res.status(200).json({ message: "중복없음" });
        }
      }
      if (nickname) {
        const nicknamecheck = await userModel.findOne({
          where: { nickname },
        });
        if (nicknamecheck) {
          return res.status(200).json({ message: "닉네임 중복" });
        } else {
          return res.status(200).json({ message: "중복없음" });
        }
      }
      if (inputPassword) {
        const { salt, id } = userInfo;

        const hashPassword = crypto
          .createHash("sha512")
          .update(inputPassword + salt)
          .digest("hex");
        const passwordcheck = await userModel.findOne({
          where: { password: hashPassword, id: id },
        });
        if (passwordcheck) {
          return res.status(200).json({ message: "비밀번호 중복" });
        } else {
          return res.status(200).json({ message: "중복없음" });
        }
      }
    } catch (err) {
      res.status(500).json({ message: "server error" });
    }
  },
};
