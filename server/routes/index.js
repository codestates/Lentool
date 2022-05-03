const router = require("express").Router();
const { main } = require("../controllers/mainpage");
/* GET home page. */
router.post("/", main);

module.exports = router;
