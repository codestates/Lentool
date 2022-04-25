const router = require("express").Router();
const { main } = require("../controllers/post");

router.get("/", main);

module.exports = router;
