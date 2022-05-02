const router = require("express").Router();
const { rooms, createroom } = require("../controllers/chattings");

router.get("/", rooms);
router.post("/create", createroom);

module.exports = router;
