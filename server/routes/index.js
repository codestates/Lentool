const router = require("express").Router();
const { main, healthckeck } = require("../controllers/mainpage");
/* GET home page. */
router.post("/", main);
router.get("/healthckeck", healthckeck);

module.exports = router;
