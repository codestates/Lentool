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
router.get("/mypage", mypage);
router.post("/logout", logout);
router.post("/login", login);
router.post("/signu", signup);
router.post("/check", check);
router.patch("/edit", edit)

module.exports = router;
