const express = require("express");
const indexController = require("../../controllers/default/index.controller");

const router = express.Router();

router.route("/").get(indexController.indexPage);

module.exports = router;
