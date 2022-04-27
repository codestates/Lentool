const { user: usermodel } = require("../../models");
const crypto = require("crypto");
module.exports = {
  signout: (req, res) => {
    return res.status(200);
  },
  mypage: (req, res) => {
    return res.status(200);
  },
  logout: (req, res) => {
    return res.status(200);
  },
  login: (req, res) => {
    return res.status(200);
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
      const registed = await usermodel.create({
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
        const emailcheck = await usermodel.findOne({
          where: { email },
        });
        if (emailcheck) {
          return res.status(200).json({ message: "이메일 중복" });
        } else {
          return res.status(200).json({ message: "중복없음" });
        }
      }
      if (nickname) {
        const nicknamecheck = await usermodel.findOne({
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
