const express = require("express");
const router = express.Router();

// Default routes
const indexRoute = require("./default/index.route");
const chatRoute = require("./default/chat.route");

const defaultRoutes = [
  { path: "/", route: indexRoute },
  { path: "/chat", route: chatRoute },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
