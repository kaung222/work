const app = require("express")();
const server = require("http").createServer(app);
// const cors = require("cors");
const io = require("socket.io")(server);

// app.use(cors());

const port = 8080;
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/home.html");
});

server.listen(port);
io.on("connection", (socket) => {
  socket.on("message", (data) => {
    console.log(data, socket.id);
    io.sockets.emit("barnyar", data);
  });
});
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.get("/", (req, res) => {
  res.send("server start");
});
