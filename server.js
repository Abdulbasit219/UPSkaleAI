const { createServer } = require("http");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    if (!req.url.startsWith("/socket.io/")) {
      handler(req, res);
    }
  });

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Join a specific room (e.g., based on User ID or Chat ID)
    socket.on("join_room", (roomId) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room: ${roomId}`);
    });

    // Send message to specific room
    socket.on("send_message", (data) => {
      /* 
     Expect data to look like:
     {
       roomId: "room_123",
       message: "Hello",
       ...
     }
  */

      // Send ONLY to users in that room (excluding sender if you prefer)
      socket.to(data.roomId).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
