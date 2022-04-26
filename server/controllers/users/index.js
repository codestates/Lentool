const { user: userModel } = require("../../models");
const { generateAccessToken, isAuthorized } = require("../tokenFunctions");

module.exports = {
  signout: (req, res) => {
    return res.status(200);
  },
  mypage: (req, res) => {
    return res.status(200);
  },
  logout: (req, res) => {
    const accessToken = req.cookies.accessToken;
    console.log(accessToken);
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
        return res
          .status(200)
          .cookie("accessToken", accessToken, {
            expires: new Date(Date.now() + 3600000),
            httpOnly: true,
          })
          .json({
            message: "ok",
          });
      }
    } catch (err) {
      console.log("로그인서버에러");
      res.status(500).json({ data: err, message: "server error" });
    }
  },
  signup: (req, res) => {
    return res.status(200);
  },
  check: (req, res) => {
    return res.status(200);
  },
};
