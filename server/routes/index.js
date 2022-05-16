const router = require("express").Router();
const { main, healthcheck } = require("../controllers/mainpage");
/* GET home page. */
router.post("/", main);
router.get("/healthcheck", healthcheck);

module.exports = router;
