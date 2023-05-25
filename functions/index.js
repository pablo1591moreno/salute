const functions = require("firebase-functions");
const { createServer } = require("http");
const { Server } = require("socket.io");

const server = createServer();
const io = new Server(server, {
  cors: {
    origin: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Se conectó un cliente");

  socket.on("chat_message", (data) => {
    io.emit("chat_message", data);
  });
});

exports.api = functions.https.onRequest((req, res) => {
  res.send("¡Hola desde la Cloud Function!");
});

exports.socket = functions.https.onRequest(server);
