/*
PRUEBA FIREBASE
const functions = require("firebase-functions");

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello, World!");
});

---------------------------
ORIGINAL

const http = require("http");

const server = http.createServer();

const usersData = {};

const io = require("socket.io")(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("Se conectó un cliente");

  socket.on("chat_message", (data) => {
    io.emit("chat_message", data);
  });
});

server.listen(5001);

-------
MODIFICADO


const functions = require("firebase-functions");
const admin = require("firebase-admin");
const http = require("http");

admin.initializeApp();

const server = http.createServer();

const io = require("socket.io")(server, {
  cors: {origin: "*"},
});

io.on("connection", (socket) => {
  console.log("Se conectó un cliente");

  socket.on("chat_message", (data) => {
    io.emit("chat_message", data);
  });
});

exports.socketServer = functions.https.onRequest((request, response) => {
  // Esta función se ejecutará cuando se reciba una solicitud HTTP

  // Configuración de cors para permitir cualquier origen
  response.set("Access-Control-Allow-Origin", "*");

  // Establecer encabezados para permitir los métodos HTTP deseados
  response.set("Access-Control-Allow-Headers", "Content-Type");
  response.set("Access-Control-Allow-Methods", "GET, POST");

  if (request.method === "OPTIONS") {
    // Devolver una respuesta exitosa para las solicitudes OPTIONS
    response.status(200).send();
  } else {
    // Ejecutar el código de socket.io en todas las demás solicitudes

    io(request, response);
  }
});

*/