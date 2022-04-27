const router = require("express").Router();
const { main } = require("../controllers/post");

router.get("/:id", main);

module.exports = router;
