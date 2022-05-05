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
  editdp,
} = require("../controllers/users");

const multer = require("multer");
const upload = multer({ dest: "./userimg" });

router.delete("/signout", signout);
router.get("/mypage", mypage);
router.patch("/edit", edit);
router.post("/logout", logout);
router.post("/login", login);
router.post("/signup", signup);
router.post("/checkemail", checkemail);
router.post("/checknickname", checknickname);
router.patch("/editdp", upload.array("user_photo"), editdp);

module.exports = router;
