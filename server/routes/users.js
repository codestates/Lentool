const router = require("express").Router();
const {
  signout,
  mypage,
  logout,
  login,
  signup,
  checkemail,
  checknickname,
  edit,
} = require("../controllers/users");

router.delete("/signout", signout);
router.get("/mypage", mypage);
router.patch("/edit", edit);
router.post("/logout", logout);
router.post("/login", login);
router.post("/signup", signup);
router.post("/checkemail", checkemail);
router.post("/checknickname", checknickname);

module.exports = router;
