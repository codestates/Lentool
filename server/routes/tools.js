const router = require("express").Router();
const { tools, deletePost } = require("../controllers/tools");
const multer = require("multer");
const upload = multer({ dest: "./postimg" });

router.post("/", upload.array("photo"), tools);
router.delete("/:id", deletePost);

module.exports = router;
