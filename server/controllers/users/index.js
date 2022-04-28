const { user: userModel } = require("../../models");
const { generateAccessToken, isAuthorized } = require("../tokenFunctions");
const crypto = require("crypto");

module.exports = {
  signout: (req, res) => {
    return res.status(200);
  },
  mypage: (req, res) => {
    return res.status(200);
  },
  logout: (req, res) => {
    const accessToken = req.cookies.accessToken;

    try {
      if (!accessToken) {
        return res
          .status(400)
          .json({ data: null, message: "로그인되지 않은 사용자 입니다" });
      }
      return res
        .status(200)
        .clearCookie("accessToken")
        .json({ data: null, message: "ok" });
    } catch (err) {
      console.log("로그아웃서버에러");
      res.status(500).json({ data: err, message: "server error" });
    }
    return res.status(200).send("ok");
  },
  login: async (req, res) => {
    const { id, password } = req.body;

    try {
      const userInfo = await userModel.findOne({
        where: { email: id },
      });
      if (!userInfo) {
        return res
          .status(401)
          .json({ data: null, message: "해당하는 회원이 존재하지 않습니다" });
      }

      if (password !== userInfo.dataValues.password) {
        return res
          .status(400)
          .json({ data: null, message: "비밀번호가 틀렸습니다" });
      }
      delete userInfo.dataValues.password;
      const accessToken = generateAccessToken(userInfo.dataValues);

      if (accessToken) {
        return res.status(200).json({
          data: { accessToken, userInfo: userInfo.dataValues },
          message: "ok",
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
      password: inputpassword,
      address /*추후 변경*/,
    } = req.body;
    if (!email || !inputpassword || !nickname || !address) {
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
        address /*추후변경*/,
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
    const { email, nickname } = req.body;
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
    } catch (err) {
      res.status(500).json({ message: "server error" });
    }
  },
};
