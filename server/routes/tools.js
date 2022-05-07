const router = require("express").Router();
const { tools, deletePost, edit } = require("../controllers/tools");
const multer = require("multer");
const upload = multer({ dest: "./postimg" });

router.post("/", upload.array("photo"), tools);
router.delete("/:id", deletePost);
router.patch("/edit/:id", upload.array("photo"), edit);

module.exports = router;
