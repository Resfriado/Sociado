const app = require("./app");
const config = require("./config");
const logger = require("./config/logger");
const { Server } = require('socket.io');

const server = app.listen(config.port, () => {
  logger.info(`Listening to port ${config.port}`);
});

const socketIO = new Server(server);

socketIO.on("connection", (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat.message', (msg) => {
    console.log('message: ', msg);
    socketIO.emit('chat.message', msg)
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});

module.exports = {socketIO}