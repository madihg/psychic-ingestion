const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

// Configure Socket.IO with CORS for Vercel deployment
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ['websocket', 'polling']
});

let userCount = 0;
let lines = []; // Store all dropped lines

// Serve static files from 'public' directory
app.use(express.static("public"));

// Serve the main page at root
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/../public/index.html");
});

// API endpoint to get current lines (for initial load)
app.get("/api/lines", (req, res) => {
  res.json({ lines });
});

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  
  // Send current lines to newly connected user
  socket.emit("initialLines", lines);
  
  // Send current user count
  userCount++;
  io.emit("userCount", userCount);

  // Handle new line drops
  socket.on("dropLine", (lineData) => {
    const newLine = {
      id: Date.now() + Math.random(), // Simple unique ID
      x: lineData.x,
      y: lineData.y,
      text: lineData.text,
      color: lineData.color || "#000000",
      timestamp: Date.now(),
      userId: socket.id
    };
    
    lines.push(newLine);
    
    // Broadcast the new line to all clients except sender
    socket.broadcast.emit("newLine", newLine);
    
    // Send confirmation back to sender
    socket.emit("lineDropped", newLine);
  });

  // Handle text updates for existing lines
  socket.on("updateLineText", (data) => {
    const line = lines.find(l => l.id === data.id);
    if (line) {
      line.text = data.text;
      io.emit("lineUpdated", { id: data.id, text: data.text });
    }
  });

  // Handle line deletion
  socket.on("deleteLine", (lineId) => {
    const lineIndex = lines.findIndex(l => l.id === lineId);
    if (lineIndex !== -1) {
      lines.splice(lineIndex, 1);
      io.emit("lineDeleted", lineId);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    userCount--;
    io.emit("userCount", userCount);
  });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

// Export for Vercel
module.exports = app;
