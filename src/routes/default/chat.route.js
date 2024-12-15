const express = require("express");
const chatController = require("../../controllers/default/chat.controller");

const router = express.Router();

router.route("/").get(chatController.indexPage);

module.exports = router;
