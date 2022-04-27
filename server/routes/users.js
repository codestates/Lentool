const router = require("express").Router();
const {
  signout,
  mypage,
  logout,
  login,
  signup,
  check,
} = require("../controllers/users");

router.delete("/signout", signout);
router.patch("/mypage", mypage);
router.post("/logout", logout);
router.post("/login", login);
router.post("/signut", signup);
router.post("/check", check);

module.exports = router;
