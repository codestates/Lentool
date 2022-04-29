const router = require("express").Router();
const { tools } = require("../controllers/tools");
const multer = require("multer");
const upload = multer({ dest: "./postimg" });

router.post("/", upload.array("photo"), tools);

module.exports = router;
