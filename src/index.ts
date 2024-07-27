import express from "express";
import http from "http";
import { Server } from "socket.io";
import { loadJsonFiles, rectData, pointData } from "./dataLoader";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
const PORT = process.env.PORT || 4000;

io.on("connection", (socket) => {
  console.log("Client connected");

  const startTime = Date.now();

  rectData.forEach((data) => {
    const delay = data.ts - (Date.now() - startTime);
    setTimeout(() => {
      socket.emit("rect", { ...data });
    }, delay);
  });

  pointData.forEach((data) => {
    const delay = data.ts - (Date.now() - startTime);
    setTimeout(() => {
      socket.emit("point", { ...data });
    }, delay);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

loadJsonFiles().then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
