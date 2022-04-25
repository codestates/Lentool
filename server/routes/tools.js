const router = require("express").Router();
const { tools } = require("../controllers/tools");

router.post("/", tools);

module.exports = router;
