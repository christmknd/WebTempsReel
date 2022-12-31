#!/usr/bin/env node

/**
 * Module dependencies.
 */

const app = require("./http/app.js");
const http = require("http");
const { Server } = require("socket.io");

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT_BACKEND || "8000");
app.set("port", port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Create WebSocket server.
 */
var portFront = normalizePort(process.env.PORT_FRONTEND || "3000");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:" + portFront,
  },
});

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
console.log("port is", port);
server.on("error", onError);
server.on("listening", onListening);

const registerChatbotHandlers = require("./ws/chatbot");
const registerSavHandlers = require("./ws/sav");
const registerPrivateChatHandlers = require("./ws/privateChat");
const registerChatRoomHandlers = require("./ws/chatRooms");
const getUser = require("./ws/auth.js");
const userService = require("./http/user/user.service.js");

const onConnectionClient = (socket) => {
  console.log(`user connected ${socket.id}`);

  registerPrivateChatHandlers(io, socket);
  registerChatbotHandlers(io, socket);
  registerChatRoomHandlers(io, socket);
  registerSavHandlers(io, socket);
  socket.on("disconnect", () => {
    console.log(`user disconnected ${socket.id}`);
  });
};

io.on("connection", onConnectionClient);

const onConnectionAdmin = (socket) => {
  console.log(`admin connected ${socket.id}`);
  socket.on("disconnect", () => {
    console.log(`admin disconnected ${socket.id}`);
  });
};

io.of("/admin").on("connection", onConnectionAdmin);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log("Listening on " + bind);
}
