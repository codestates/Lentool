const router = require("express").Router();
const { main, search } = require("../controllers/posts");

router.get("/", main);
router.get("/search", search);
module.exports = router;
