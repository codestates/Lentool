const router = require("express").Router();
const main = require("../controllers/mainpage");
/* GET home page. */
router.get("/", main);

module.exports = router;
