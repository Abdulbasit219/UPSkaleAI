const { Server } = require("socket.io");
const http = require("http");

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Allow requests from our Next.js frontend
    methods: ["GET", "POST"],
  },
});

/**
 * Socket.io Connection Event
 * This runs every time a client (browser) connects to our server.
 */
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  /**
   * STEP 1: Join a Private Room
   * When the client emits 'join_room', we put them into a specific room.
   * Rooms allow us to separate chats between different users/recruiters.
   */
  socket.on("join_room", (roomID) => {
    socket.join(roomID);
    console.log(`User ${socket.id} joined room: ${roomID}`);
  });

  /**
   * STEP 2: Handle Sending Messages
   * Instead of broadcasting to everyone, we only send the message to users
   * who are currently joined in the 'roomID' specified in the data.
   */
  socket.on("send_message", (data) => {
    console.log(`Message in room ${data.roomID}:`, data);

    // io.to(roomID) targets ONLY the people in that specific private room
    io.to(data.roomID).emit("receive_message", data);
  });

  /**
   * STEP 3: Handle Disconnection
   * Clean up when a user closes their tab or browser.
   */
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Socket server is running on port ${PORT}`);
});
