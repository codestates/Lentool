const router = require("express").Router();
const {
  signout,
  mypage,
  logout,
  login,
  signup,
  check,
  edit,
} = require("../controllers/users");

router.delete("/signout", signout);
router.get("/mypage", mypage);
router.patch("/edit", edit);
router.post("/logout", logout);
router.post("/login", login);
router.post("/signup", signup);
router.post("/check", check);

module.exports = router;
