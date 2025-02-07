const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes.js");
const connectToDatabase = require("./utils.js");
const importFlights = require('./scripts/importFlights.js');
dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

// Socket.IO Chat Logic
const connectedUsers = {};

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("joinChat", ({ nickname }) => {
    connectedUsers[socket.id] = nickname;
    console.log(`${nickname} joined the chat`);
    io.emit("userJoined", { nickname });
  });

  socket.on("sendMessage", ({ sender, message }) => {
    console.log(`${sender}: ${message}`);
    io.emit("receiveMessage", { sender, message });
  });

  socket.on("disconnect", () => {
    const nickname = connectedUsers[socket.id];
    delete connectedUsers[socket.id];
    console.log(`${nickname} disconnected`);
    io.emit("userLeft", { nickname });
  });
});


(async () => {
    try {
        const db = await connectToDatabase();
        const PORT = process.env.PORT || 5000;
        server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
        // await importFlights(db);
        // console.log('Flights imported successfully');
    } catch (err) {
        console.error('Failed to connect to database:', err);
        process.exit(1);
    }
})();
